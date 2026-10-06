import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SEED_PACK } from '../data/seedpack.js';
import { TIERS, TIER_ORDER } from '../js/tiers.js';
import { fromPack } from '../js/puzzles.js';
import { beamSolve } from '../js/solver.js';
import { replay, isWin } from '../js/engine.js';

test('a sample of the seed pack rebuilds and matches the solver', () => {
  for (const id of TIER_ORDER) {
    const entries = SEED_PACK[id] || [];
    if (!entries.length) continue;
    const step = Math.max(1, Math.floor(entries.length / 6));
    for (let i = 0; i < entries.length; i += step) {
      const [subSeed, par] = entries[i];
      const puzzle = fromPack(TIERS[id], subSeed, par, i);
      assert.ok(isWin(replay(puzzle, puzzle.solution, null, { assertLegal: true })), `${id}[${i}] stored solution fails`);
      const r = beamSolve(puzzle);
      assert.ok(r.won, `${id}[${i}] solver cannot verify`);
      assert.equal(TIERS[id].hand - r.bestLength, par, `${id}[${i}] par drifted; rebuild the pack`);
    }
  }
});
