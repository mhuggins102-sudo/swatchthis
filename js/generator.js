// Puzzle generator: backward construction from a solved board, quality
// checks, and forward verification by the solver. Pure and DOM-free.

import { cardDef, DETERMINISTIC_IDS, LUCK_IDS } from './cards.js';
import { Rng, hashSeed } from './rng.js';
import { uniformGrid, colorsPresent, largestShare, gridsEqual } from './grid.js';
import { beamSolve, greedyPlay } from './solver.js';
import { DEFAULT_CARD_WEIGHTS, DEFAULT_LUCK_WEIGHTS } from './tiers.js';

function weightedPool(weights, ids) {
  return ids.filter((id) => (weights[id] ?? 0) > 0).map((id) => [id, weights[id]]);
}

function countType(list, type) {
  let n = 0;
  for (const c of list) if (c.type === type) n++;
  return n;
}

// Build one candidate puzzle. Returns { puzzle, reason } where puzzle is null
// when the candidate was rejected and reason says why.
export function buildCandidate(tier, seed, opts = {}) {
  const rng = new Rng(seed);
  const cardWeights = { ...DEFAULT_CARD_WEIGHTS, ...(tier.cardWeights || {}) };
  const luckWeights = { ...DEFAULT_LUCK_WEIGHTS, ...(tier.luckWeights || {}) };
  const { size, colors, hand: handSize, k } = tier;
  const maxTransmutes = tier.maxTransmutes ?? Math.max(0, colors - 2);
  const lockedRatio = tier.lockedRatio ?? 0.3;
  const luckCount = Array.isArray(tier.luck) ? rng.range(tier.luck[0], tier.luck[1]) : tier.luck;
  const decoyCount = handSize - k - luckCount;
  if (decoyCount < 0) throw new Error('hand is smaller than k plus luck cards');

  // 1. Walk backward from a uniform board.
  let grid = uniformGrid(size, rng.int(colors));
  const steps = []; // in construction order (last step = first move of the solution)
  for (let s = 0; s < k; s++) {
    let pool = weightedPool(cardWeights, DETERMINISTIC_IDS);
    if (countType(steps, 'transmute') >= maxTransmutes) pool = pool.filter(([id]) => id !== 'transmute');
    let done = false;
    while (pool.length && !done) {
      const type = rng.weighted(pool);
      const def = cardDef(type);
      const inv = def.invert({ size, colors, grid }, rng, null);
      if (!inv) {
        pool = pool.filter(([id]) => id !== type);
        continue;
      }
      // Sanity: the forward card must restore the board we came from.
      const restored = def.apply({ size, colors, grid: inv.grid }, inv.target, null, null);
      if (!gridsEqual(restored, grid)) throw new Error(`inverse of ${type} does not restore the board (seed ${seed})`);
      steps.push({ type, target: inv.target });
      grid = inv.grid;
      done = true;
    }
    if (!done) return { puzzle: null, reason: 'no_inverse' };
  }

  // 2. Quality checks on the start board.
  const present = colorsPresent(grid, colors).length;
  if (present < (tier.minColorsPresent ?? colors - 1)) return { puzzle: null, reason: 'few_colors' };
  if (largestShare(grid, colors) > (tier.maxShareStart ?? 0.5)) return { puzzle: null, reason: 'big_share' };

  // 3. Build the hand: solution cards, decoys, luck cards.
  let uidCounter = 0;
  const makeInst = (type, lockedColor = null) => ({ uid: `c${++uidCounter}`, type, lockedColor });
  const solutionSteps = steps.slice().reverse();
  const solutionInsts = solutionSteps.map((step) => {
    const def = cardDef(step.type);
    let lockedColor = null;
    if (def.lockParam && rng.chance(lockedRatio)) lockedColor = step.target[def.lockParam];
    return makeInst(step.type, lockedColor);
  });
  const hand = solutionInsts.slice();
  const startColors = colorsPresent(grid, colors);
  for (let d = 0; d < decoyCount; d++) {
    let pool = weightedPool(cardWeights, DETERMINISTIC_IDS);
    if (countType(hand, 'transmute') >= maxTransmutes) pool = pool.filter(([id]) => id !== 'transmute');
    const type = rng.weighted(pool);
    const def = cardDef(type);
    const lockedColor = def.lockParam && rng.chance(lockedRatio) ? rng.pick(startColors) : null;
    hand.push(makeInst(type, lockedColor));
  }
  for (let l = 0; l < luckCount; l++) {
    const type = rng.weighted(weightedPool(luckWeights, LUCK_IDS));
    const def = cardDef(type);
    const lockedColor = def.lockParam && rng.chance(lockedRatio) ? rng.pick(startColors) : null;
    hand.push(makeInst(type, lockedColor));
  }
  rng.shuffle(hand);

  const solution = solutionSteps.map((step, i) => ({ uid: solutionInsts[i].uid, target: step.target }));
  const puzzle = {
    seed, tier: tier.id, size, colors, grid, hand, solution, par: null, handMode: 'open',
    k, luckCount,
  };

  // 4. The greedy baseline must not find a shortcut.
  if (!opts.skipGreedyCheck) {
    const g = greedyPlay(puzzle);
    const shortcut = tier.greedyShortcut ?? 0;
    if (g.won && g.length < k - shortcut) return { puzzle: null, reason: 'greedy_shortcut' };
    puzzle.greedy = { won: g.won, length: g.length };
  }

  // 5. Forward verification sets par.
  if (opts.skipSolver) return { puzzle, reason: 'ok' };
  const result = beamSolve(puzzle, { beamWidth: opts.beamWidth ?? 48 });
  if (!result.won) return { puzzle: null, reason: 'unverified' };
  // Optionally reject boards whose shortest win undercuts the constructed
  // line by more than maxSolverShortcut cards.
  if (tier.maxSolverShortcut != null && k - result.bestLength > tier.maxSolverShortcut) return { puzzle: null, reason: 'solver_shortcut' };
  puzzle.par = handSize - result.bestLength;
  puzzle.bestLength = result.bestLength;
  puzzle.solverLines = result.lines;
  return { puzzle, reason: 'ok' };
}

// Generate a verified puzzle for a tier from a seed, retrying sub-seeds until
// one passes. Returns { puzzle, attempts, rejections, ms }.
export function generatePuzzle(tier, seed, opts = {}) {
  const maxAttempts = opts.maxAttempts ?? 200;
  const rejections = {};
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const subSeed = hashSeed(`${seed}:${attempt}`);
    const { puzzle, reason } = buildCandidate(tier, subSeed, opts);
    if (puzzle) {
      puzzle.seed = seed;
      puzzle.subSeed = subSeed;
      puzzle.attempt = attempt;
      const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
      return { puzzle, attempts: attempt + 1, rejections, ms: t1 - t0 };
    }
    rejections[reason] = (rejections[reason] || 0) + 1;
  }
  throw new Error(`Could not generate a verified puzzle for ${tier.id} from seed ${seed}`);
}
