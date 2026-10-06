// Simulation harness: generates N puzzles per configuration, plays them with
// the bots, and prints/saves the metrics tables.
//
//   node sim/run.js [--n 2000] [--bots random,greedy,lookahead,solver,solverEv]
//                   [--config name,name2 | --all] [--lines] [--out sim/results]
//
// Configurations live in sim/configs.js. Results go to sim/results/<name>.json
// and a markdown summary is printed.

import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CONFIGS } from './configs.js';
import { DETERMINISTIC_IDS, LUCK_IDS } from '../js/cards.js';

const here = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { n: 2000, bots: 'random,greedy,lookahead,solver', config: null, all: false, lines: false, pack: false, out: join(here, 'results'), workers: cpus().length };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') args.all = true;
    else if (a === '--lines') args.lines = true;
    else if (a === '--pack') args.pack = true;
    else if (a.startsWith('--')) args[a.slice(2)] = argv[++i];
  }
  args.n = Number(args.n);
  args.workers = Number(args.workers);
  args.bots = args.bots.split(',');
  return args;
}

export function runConfig(tier, { n, bots, lines, workers }) {
  const seeds = [];
  for (let i = 0; i < n; i++) seeds.push(`${tier.id}-${i}`);
  const slices = [];
  for (let w = 0; w < workers; w++) slices.push(seeds.filter((_, i) => i % workers === w));
  let progress = 0;
  const t0 = performance.now();
  return Promise.all(slices.map((slice) => new Promise((resolve, reject) => {
    const worker = new Worker(join(here, 'worker.js'), { workerData: { tier, seeds: slice, bots, countLines: lines } });
    worker.on('message', (m) => {
      if (m.progress) {
        progress += m.progress;
        if (progress % 100 === 0) process.stderr.write(`\r${tier.id}: ${progress}/${n} (${((performance.now() - t0) / 1000).toFixed(0)}s)`);
      }
      if (m.done) { if (m.failures) process.stderr.write(`\n${tier.id}: ${m.failures} seeds could not be generated within 2000 attempts\n`); resolve(m.done); }
    });
    worker.on('error', reject);
  }))).then((parts) => {
    process.stderr.write('\n');
    const records = parts.flat();
    const sum = summarize(tier, records, bots);
    sum.pack = records.map((r) => [r.subSeed, r.par]);
    return sum;
  });
}

function pct(x) {
  return `${(x * 100).toFixed(1)}%`;
}

export function summarize(tier, records, bots) {
  const n = records.length;
  const sum = { n, tier: tier.id, config: tier, bots: {}, cards: {}, generation: {} };
  for (const b of bots) {
    const rs = records.map((r) => r.bots[b]);
    const wins = rs.filter((r) => r.won).length;
    const stars = [0, 0, 0, 0];
    for (const r of rs) stars[r.stars]++;
    sum.bots[b] = {
      winRate: wins / n,
      stars: stars.map((s) => s / n),
      meanStars: rs.reduce((a, r) => a + r.stars, 0) / n,
      meanLength: rs.reduce((a, r) => a + r.length, 0) / n,
      meanMs: rs.reduce((a, r) => a + r.ms, 0) / n,
      luckUsedRate: rs.filter((r) => r.luckUsed > 0).length / n,
    };
  }
  if (bots.includes('greedy') && bots.includes('solver')) {
    sum.greedyTrapRate = records.filter((r) => !r.bots.greedy.won && r.bots.solver.won).length / n;
  }
  if (bots.includes('solver') && bots.includes('solverEv')) {
    sum.luckValue = sum.bots.solverEv.meanStars - sum.bots.solver.meanStars;
  }
  if (bots.includes('greedy') && bots.includes('greedyDet')) {
    sum.luckValueGreedy = sum.bots.greedy.meanStars - sum.bots.greedyDet.meanStars;
  }
  if (bots.includes('lookahead') && bots.includes('lookaheadDet')) {
    sum.luckValueLookahead = sum.bots.lookahead.meanStars - sum.bots.lookaheadDet.meanStars;
  }
  sum.meanLines = records.reduce((a, r) => a + (r.lines || 0), 0) / n;
  sum.meanBestLength = records.reduce((a, r) => a + r.bestLength, 0) / n;
  sum.meanPar = records.reduce((a, r) => a + r.par, 0) / n;
  sum.meanK = records.reduce((a, r) => a + r.k, 0) / n;
  // Per-card usage: of the puzzles where the card is dealt, how often the
  // solver's winning line (or the lookahead's win) uses it, and how often it
  // is left unplayed in the solver's line.
  const winnerBots = bots.filter((b) => b === 'solver' || b === 'lookahead');
  for (const id of [...DETERMINISTIC_IDS, ...LUCK_IDS]) {
    const dealt = records.filter((r) => r.hand.includes(id));
    const entry = { dealtRate: dealt.length / n, dealtCount: dealt.length };
    for (const b of winnerBots) {
      const wonWith = dealt.filter((r) => r.bots[b].won && r.bots[b].used.includes(id)).length;
      const won = dealt.filter((r) => r.bots[b].won).length;
      entry[`${b}UsedInWin`] = dealt.length ? wonWith / dealt.length : 0;
      entry[`${b}UsedWhenWon`] = won ? wonWith / won : 0;
    }
    sum.cards[id] = entry;
  }
  const rej = {};
  let attempts = 0;
  for (const r of records) {
    attempts += r.attempts;
    for (const k in r.rejections) rej[k] = (rej[k] || 0) + r.rejections[k];
  }
  sum.generation = {
    attemptsPerPuzzle: attempts / n,
    rejectionRate: 1 - n / attempts,
    rejections: rej,
    meanMs: records.reduce((a, r) => a + r.genMs, 0) / n,
    maxMs: Math.max(...records.map((r) => r.genMs)),
    lockedPerHand: records.reduce((a, r) => a + r.locked, 0) / n,
  };
  return sum;
}

export function markdown(sum) {
  const lines = [];
  const t = sum.config;
  lines.push(`### ${sum.tier} (n=${sum.n})`);
  lines.push('');
  lines.push(`Grid ${t.size}x${t.size}, ${t.colors} colors, hand ${t.hand}, k ${t.k}, luck ${JSON.stringify(t.luck)}, max Transmutes ${t.maxTransmutes}, locked ratio ${t.lockedRatio}, greedy shortcut ${t.greedyShortcut}${t.cardWeights ? `, card weights ${JSON.stringify(t.cardWeights)}` : ''}`);
  lines.push('');
  lines.push('| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const [b, r] of Object.entries(sum.bots)) {
    lines.push(`| ${b} | ${pct(r.winRate)} | ${pct(r.stars[0])} | ${pct(r.stars[1])} | ${pct(r.stars[2])} | ${pct(r.stars[3])} | ${r.meanStars.toFixed(2)} | ${r.meanLength.toFixed(1)} | ${r.meanMs.toFixed(0)} |`);
  }
  lines.push('');
  const extra = [];
  if (sum.greedyTrapRate != null) extra.push(`Greedy trap rate ${pct(sum.greedyTrapRate)}`);
  if (sum.luckValue != null) extra.push(`luck card value for the EV solver ${sum.luckValue >= 0 ? '+' : ''}${sum.luckValue.toFixed(2)} stars`);
  if (sum.luckValueGreedy != null) extra.push(`for Greedy ${sum.luckValueGreedy >= 0 ? '+' : ''}${sum.luckValueGreedy.toFixed(2)} stars`);
  if (sum.luckValueLookahead != null) extra.push(`for Lookahead ${sum.luckValueLookahead >= 0 ? '+' : ''}${sum.luckValueLookahead.toFixed(2)} stars`);
  extra.push(`winning lines found (capped) ${sum.meanLines.toFixed(1)}`);
  extra.push(`shortest win ${sum.meanBestLength.toFixed(2)} cards (constructed k ${sum.meanK.toFixed(1)}, par ${sum.meanPar.toFixed(2)} left)`);
  lines.push(extra.join(' · '));
  lines.push('');
  const g = sum.generation;
  lines.push(`Generation: ${g.attemptsPerPuzzle.toFixed(1)} attempts/puzzle (rejection ${pct(g.rejectionRate)}: ${Object.entries(g.rejections).map(([k, v]) => `${k} ${v}`).join(', ')}), ${g.meanMs.toFixed(0)} ms mean, ${g.maxMs.toFixed(0)} ms max, ${g.lockedPerHand.toFixed(1)} locked cards/hand`);
  lines.push('');
  const winnerBots = Object.keys(sum.bots).filter((b) => b === 'solver' || b === 'lookahead');
  lines.push(`| Card | Dealt in | ${winnerBots.map((b) => `In ${b} wins (of dealt)`).join(' | ')} | ${winnerBots.map((b) => `Used when ${b} won`).join(' | ')} |`);
  lines.push(`| --- | --- | ${winnerBots.map(() => '---').join(' | ')} | ${winnerBots.map(() => '---').join(' | ')} |`);
  for (const [id, c] of Object.entries(sum.cards)) {
    lines.push(`| ${id} | ${pct(c.dealtRate)} | ${winnerBots.map((b) => pct(c[`${b}UsedInWin`])).join(' | ')} | ${winnerBots.map((b) => pct(c[`${b}UsedWhenWon`])).join(' | ')} |`);
  }
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const names = args.all ? Object.keys(CONFIGS) : (args.config ? args.config.split(',') : ['easy', 'medium', 'hard']);
  mkdirSync(args.out, { recursive: true });
  const pack = { meta: { generatedAt: new Date().toISOString(), perTier: args.n } };
  for (const name of names) {
    const tier = CONFIGS[name];
    if (!tier) throw new Error(`Unknown config ${name}`);
    const sum = await runConfig({ ...tier, id: name }, args);
    pack[name] = sum.pack;
    delete sum.pack;
    writeFileSync(join(args.out, `${name}.json`), JSON.stringify(sum, null, 1));
    const md = markdown(sum);
    writeFileSync(join(args.out, `${name}.md`), md);
    console.log(md);
  }
  if (args.pack) {
    // Only the shipped tiers go into the pack.
    for (const k of Object.keys(pack)) if (k !== 'meta' && !['easy', 'medium', 'hard'].includes(k)) delete pack[k];
    const out = `// Verified seed pack. Generated by \`node sim/run.js --pack\`; do not edit by hand.
// Each entry is [subSeed, par]. The browser rebuilds the puzzle from subSeed
// deterministically and trusts par, which the solver computed in Node.
export const SEED_PACK = ${JSON.stringify(pack)};
`;
    writeFileSync(join(here, '..', 'data', 'seedpack.js'), out);
    console.log(`wrote data/seedpack.js with ${Object.keys(pack).filter((k) => k !== 'meta').map((k) => `${k}: ${pack[k].length}`).join(', ')}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
