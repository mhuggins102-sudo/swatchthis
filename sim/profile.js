import { buildCandidate } from '../js/generator.js';
import { beamSolve, greedyPlay, expansions } from '../js/solver.js';
import { TIERS } from '../js/tiers.js';
import { hashSeed } from '../js/rng.js';
import { newState } from '../js/engine.js';
import { cardDef } from '../js/cards.js';

const tier = TIERS[process.argv[2] || 'medium'];
let tBuild = 0, tGreedy = 0, tSolve = 0, n = 0, nodes = 0;
const perCard = {};
for (let i = 0; i < 40; i++) {
  const seed = hashSeed(`p${i}`);
  let t = performance.now();
  const { puzzle } = buildCandidate(tier, seed, { skipGreedyCheck: true, beamWidth: 1 });
  tBuild += performance.now() - t;
  if (!puzzle) continue;
  n++;
  t = performance.now();
  greedyPlay(puzzle);
  tGreedy += performance.now() - t;
  t = performance.now();
  const r = beamSolve(puzzle, { beamWidth: 48 });
  tSolve += performance.now() - t;
  nodes += r.nodes;
  // targets count per card type on the start board
  const st = newState(puzzle);
  for (let h = 0; h < st.hand.length; h++) {
    const inst = st.hand[h];
    const k = cardDef(inst.type).targets({ size: st.size, colors: st.colors, grid: st.grid }, inst).length;
    perCard[inst.type] = Math.max(perCard[inst.type] || 0, k);
  }
}
console.log(`n=${n} build ${(tBuild / 40).toFixed(1)}ms greedy ${(tGreedy / n).toFixed(1)}ms solve ${(tSolve / n).toFixed(1)}ms nodes/solve ${(nodes / n).toFixed(0)} ns/node ${(tSolve * 1e6 / nodes).toFixed(0)}`);
console.log(perCard);
