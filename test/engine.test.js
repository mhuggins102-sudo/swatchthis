import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  newState, legalTargets, applyMove, isWin, isLoss, starsFor, startSession, playInSession,
  undoInSession, canUndo, restartSession, replay, isNoop,
} from '../js/engine.js';

const puzzle = {
  seed: 'test', tier: 'easy', size: 3, colors: 3, par: 1,
  grid: [0, 0, 1, 0, 0, 1, 2, 2, 2],
  hand: [
    { uid: 'a', type: 'colPaint', lockedColor: null },
    { uid: 'b', type: 'rowPaint', lockedColor: null },
    { uid: 'c', type: 'scatter', lockedColor: null },
  ],
  solution: [],
};

test('applyMove returns a new state and leaves the old one alone', () => {
  const s0 = newState(puzzle);
  const t = legalTargets(s0, 0).find((x) => x.line.index === 2 && x.color === 0);
  const s1 = applyMove(s0, 0, t);
  assert.deepEqual(s0.grid, puzzle.grid);
  assert.deepEqual(s1.grid, [0, 0, 0, 0, 0, 0, 2, 2, 0]);
  assert.equal(s1.hand.length, 2);
  assert.equal(s1.discard[0].uid, 'a');
  assert.equal(s1.turn, 1);
});

test('win, loss and stars', () => {
  let s = newState(puzzle);
  s = applyMove(s, 0, legalTargets(s, 0).find((x) => x.line.index === 2 && x.color === 0));
  assert.ok(!isWin(s));
  s = applyMove(s, 0, legalTargets(s, 0).find((x) => x.line.index === 2 && x.color === 0));
  assert.ok(isWin(s));
  assert.equal(starsFor(s, 1), 3);
  assert.equal(starsFor(s, 2), 2);
  assert.equal(starsFor(s, 4), 1);
  assert.equal(starsFor(newState(puzzle), 1), 0);
  const lost = { ...newState(puzzle), hand: [] };
  assert.ok(isLoss(lost));
});

test('no-op plays are detected', () => {
  const s = newState(puzzle);
  const t = legalTargets(s, 1).find((x) => x.line.index === 2 && x.color === 2);
  assert.ok(isNoop(s, 1, t));
});

test('undo is unlimited back to the latest luck card, and restart rerolls luck', () => {
  let sess = startSession(puzzle);
  const t1 = legalTargets(sess.state, 1).find((x) => x.line.index === 0 && x.color === 2);
  sess = playInSession(sess, 1, t1);
  assert.ok(canUndo(sess));
  sess = undoInSession(sess);
  assert.deepEqual(sess.state.grid, puzzle.grid);
  assert.ok(!canUndo(sess));
  sess = playInSession(sess, 1, t1);
  // play the luck card
  const li = sess.state.hand.findIndex((c) => c.type === 'scatter');
  const lt = { cells: [6] };
  const after1 = playInSession(sess, li, lt);
  assert.ok(!canUndo(after1));
  // same session replays identically; a restart rolls fresh
  const again = playInSession(sess, li, lt);
  assert.deepEqual(again.state.grid, after1.state.grid);
  let r = restartSession(sess);
  assert.equal(r.restarts, 1);
  assert.deepEqual(r.state.grid, puzzle.grid);
  r = playInSession(r, 1, t1);
  const li2 = r.state.hand.findIndex((c) => c.type === 'scatter');
  const afterRestart = playInSession(r, li2, lt);
  // We can only assert determinism per restart count here.
  assert.deepEqual(playInSession(r, li2, lt).state.grid, afterRestart.state.grid);
});

test('replay follows a recorded line by card uid', () => {
  const s = replay(puzzle, [
    { uid: 'a', target: { cells: [2, 5, 8], line: { kind: 'col', index: 2 }, color: 0 } },
    { uid: 'b', target: { cells: [6, 7, 8], line: { kind: 'row', index: 2 }, color: 0 } },
  ]);
  assert.ok(isWin(s));
});
