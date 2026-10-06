// Puzzle source for the browser. Prefers the verified seed pack (no solver
// work on the device); falls back to full on-device generation when a tier
// has no pack entries or a specific seed is requested.

import { buildCandidate, generatePuzzle } from './generator.js';
import { TIERS } from './tiers.js';
import { SEED_PACK } from '../data/seedpack.js';

export function tierFor(id) {
  const tier = TIERS[id];
  if (!tier) throw new Error(`Unknown tier ${id}`);
  return tier;
}

// Returns { puzzle, source } where source is 'pack' or 'device'.
export function getPuzzle(tierId, { seed = null, pickIndex = null } = {}) {
  const tier = tierFor(tierId);
  if (seed != null) {
    // Explicit seed: full pipeline so the result is verified.
    return { puzzle: generatePuzzle(tier, seed).puzzle, source: 'device' };
  }
  const pack = SEED_PACK[tierId] || [];
  if (pack.length) {
    const i = pickIndex == null ? Math.floor(Math.random() * pack.length) : pickIndex % pack.length;
    const [subSeed, par] = pack[i];
    return { puzzle: fromPack(tier, subSeed, par, i), source: 'pack' };
  }
  const s = `d-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
  return { puzzle: generatePuzzle(tier, s).puzzle, source: 'device' };
}

export function fromPack(tier, subSeed, par, index) {
  const { puzzle, reason } = buildCandidate(tier, subSeed, { skipGreedyCheck: true, skipSolver: true });
  if (!puzzle) throw new Error(`Seed pack entry ${index} for ${tier.id} failed to build (${reason}); regenerate the pack`);
  puzzle.par = par;
  puzzle.bestLength = tier.hand - par;
  puzzle.seed = `pack:${tier.id}:${index}`;
  puzzle.subSeed = subSeed;
  return puzzle;
}

// Rebuild a puzzle from a seed string produced above (pack:<tier>:<i> or a
// plain seed), used to restore the game after a reload.
export function puzzleFromSeed(tierId, seed) {
  const tier = tierFor(tierId);
  const m = /^pack:(\w+):(\d+)$/.exec(seed || '');
  if (m && SEED_PACK[m[1]] && SEED_PACK[m[1]][Number(m[2])]) {
    const [subSeed, par] = SEED_PACK[m[1]][Number(m[2])];
    return fromPack(TIERS[m[1]], subSeed, par, Number(m[2]));
  }
  return generatePuzzle(tier, seed).puzzle;
}
