// Worker: generates and plays a slice of puzzles for one configuration.
import { parentPort, workerData } from 'node:worker_threads';
import { generatePuzzle } from '../js/generator.js';
import { Rng, hashSeed } from '../js/rng.js';
import { BOTS } from './bots.js';
import { beamSolve } from '../js/solver.js';
import { cardDef } from '../js/cards.js';

const { tier, seeds, bots, countLines } = workerData;
const out = [];
let failures = 0;
for (const seed of seeds) {
  let gen;
  try {
    gen = generatePuzzle(tier, seed, { maxAttempts: 2000 });
  } catch (e) {
    failures++;
    parentPort.postMessage({ progress: 1 });
    continue;
  }
  const puzzle = gen.puzzle;
  const rec = {
    seed, subSeed: puzzle.subSeed, attempts: gen.attempts, rejections: gen.rejections, genMs: gen.ms,
    par: puzzle.par, bestLength: puzzle.bestLength, k: puzzle.k, luckCount: puzzle.luckCount,
    hand: puzzle.hand.map((c) => c.type), locked: puzzle.hand.filter((c) => c.lockedColor != null).length,
    bots: {},
  };
  if (countLines) {
    const full = beamSolve(puzzle, { beamWidth: 48, stopAtFirstDepth: false, maxLines: 50 });
    rec.lines = full.lines;
  } else rec.lines = puzzle.solverLines;
  for (const name of bots) {
    const rng = new Rng(hashSeed(`${seed}:${name}`));
    const t0 = performance.now();
    const r = BOTS[name](puzzle, rng);
    rec.bots[name] = {
      won: r.won, stars: r.stars, length: r.length, ms: performance.now() - t0,
      used: r.line.map((m) => puzzle.hand.find((c) => c.uid === m.uid).type),
      luckUsed: r.line.filter((m) => cardDef(puzzle.hand.find((c) => c.uid === m.uid).type).isLuck).length,
    };
  }
  out.push(rec);
  parentPort.postMessage({ progress: 1 });
}
parentPort.postMessage({ done: out, failures });
