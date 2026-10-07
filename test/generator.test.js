import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCandidate, generatePuzzle } from '../js/generator.js';
import { TIERS, TIER_ORDER } from '../js/tiers.js';
import { replay, isWin, starsFor } from '../js/engine.js';
import { beamSolve } from '../js/solver.js';
import { cardDef } from '../js/cards.js';
import { hashSeed } from '../js/rng.js';

test('1,000 constructed boards per tier are all won by replaying the stored solution', () => {
  for (const id of TIER_ORDER) {
    const tier = TIERS[id];
    let built = 0;
    let seed = 0;
    while (built < 1000) {
      const { puzzle } = buildCandidate(tier, hashSeed(`prop-${id}-${seed++}`), { skipGreedyCheck: true, skipSolver: true });
      if (!puzzle) continue;
      built++;
      assert.equal(puzzle.hand.length, tier.hand);
      assert.equal(puzzle.solution.length, tier.k);
      const luck = puzzle.hand.filter((c) => cardDef(c.type).isLuck).length;
      assert.ok(luck >= tier.luck[0] && luck <= tier.luck[1], `${id}: ${luck} luck cards`);
      const transmutes = puzzle.hand.filter((c) => c.type === 'transmute').length;
      assert.ok(transmutes <= tier.maxTransmutes, `${id}: ${transmutes} transmutes`);
      assert.ok(transmutes < tier.colors - 1);
      // No repeated types, except one wild/locked pair of a color card.
      const byType = {};
      for (const c of puzzle.hand) (byType[c.type] = byType[c.type] || []).push(c);
      let repeats = 0;
      for (const [type, insts] of Object.entries(byType)) {
        if (insts.length === 1) continue;
        assert.equal(insts.length, 2, `${id}: ${type} dealt ${insts.length} times`);
        assert.ok(cardDef(type).lockParam, `${id}: ${type} repeated without a color lock`);
        assert.ok(insts.some((c) => c.lockedColor != null) && insts.some((c) => c.lockedColor == null), `${id}: ${type} pair is not one wild, one locked`);
        repeats++;
      }
      assert.ok(repeats <= 1, `${id}: ${repeats} repeated pairs`);
      const end = replay(puzzle, puzzle.solution, null, { assertLegal: true });
      assert.ok(isWin(end), `${id} seed ${seed - 1}: stored solution does not win`);
      assert.equal(end.hand.length, tier.hand - tier.k);
    }
  }
});

test('the same seed produces the same board, hand and solution', () => {
  for (const id of TIER_ORDER) {
    const a = generatePuzzle(TIERS[id], 'determinism');
    const b = generatePuzzle(TIERS[id], 'determinism');
    assert.deepEqual(a.puzzle, b.puzzle);
    const c = generatePuzzle(TIERS[id], 'determinism-2');
    assert.notDeepEqual(a.puzzle.grid, c.puzzle.grid);
  }
});

test('verified puzzles: the solver line wins, par matches, start board passes quality checks', () => {
  for (const id of TIER_ORDER) {
    const tier = TIERS[id];
    for (let i = 0; i < 2; i++) {
      const { puzzle } = generatePuzzle(tier, `verify-${id}-${i}`);
      const result = beamSolve(puzzle);
      assert.ok(result.won);
      const end = replay(puzzle, result.bestLine, null, { assertLegal: true });
      assert.ok(isWin(end));
      assert.equal(end.hand.length, tier.hand - result.bestLength);
      assert.equal(puzzle.par, tier.hand - result.bestLength);
      assert.equal(starsFor(end, puzzle.par), 3);
      assert.ok(puzzle.par >= tier.hand - tier.k, 'par is at least as good as the constructed line');
      const counts = new Array(tier.colors).fill(0);
      for (const c of puzzle.grid) counts[c]++;
      assert.ok(Math.max(...counts) / puzzle.grid.length <= tier.maxShareStart);
      assert.ok(counts.filter((n) => n > 0).length >= tier.minColorsPresent);
    }
  }
});
