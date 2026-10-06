// Rules engine. Pure and DOM-free: no document, no timers, no Math.random.
// Randomness for luck cards comes in through an Rng passed by the caller.
//
// A puzzle (from the generator) is:
//   { seed, tier, size, colors, grid, hand: [inst], solution: [{uid, target}], par }
// where par is the solver's best leftover-card count.
//
// A state is plain JSON-serializable data:
//   { size, colors, grid, hand, discard, seed, turn, handMode }
// hand holds card instances { uid, type, lockedColor }; discard holds the
// instances played so far, in order, each with the target used.

import { cardDef } from './cards.js';
import { isUniform, gridsEqual, largestShare, colorCounts } from './grid.js';
import { Rng, hashSeed } from './rng.js';

export function newState(puzzle) {
  return {
    size: puzzle.size,
    colors: puzzle.colors,
    grid: puzzle.grid.slice(),
    hand: puzzle.hand.map((c) => ({ ...c })),
    discard: [],
    seed: puzzle.seed,
    turn: 0,
    handMode: puzzle.handMode || 'open',
  };
}

export function boardOf(state) {
  return { size: state.size, colors: state.colors, grid: state.grid };
}

export function isWin(state) {
  return isUniform(state.grid);
}

export function isLoss(state) {
  return !isWin(state) && state.hand.length === 0;
}

export function isOver(state) {
  return isWin(state) || state.hand.length === 0;
}

// Every legal target for the card at hand index i.
export function legalTargets(state, handIndex) {
  const inst = state.hand[handIndex];
  if (!inst) return [];
  return cardDef(inst.type).targets(boardOf(state), inst);
}

export function canPlay(state, handIndex) {
  return legalTargets(state, handIndex).length > 0;
}

// Grid after playing the card, without committing. For luck cards an rng is
// required; pass none to get a deterministic card's preview.
export function previewGrid(state, handIndex, target, rng) {
  const inst = state.hand[handIndex];
  const def = cardDef(inst.type);
  return def.apply(boardOf(state), target, rng, inst);
}

export function isNoop(state, handIndex, target) {
  const inst = state.hand[handIndex];
  if (cardDef(inst.type).isLuck) return false;
  return gridsEqual(state.grid, previewGrid(state, handIndex, target));
}

// Play a card: returns a new state (the old one is untouched).
export function applyMove(state, handIndex, target, rng) {
  const inst = state.hand[handIndex];
  if (!inst) throw new Error(`No card at hand index ${handIndex}`);
  const def = cardDef(inst.type);
  if (def.isLuck && !rng) throw new Error(`Luck card ${inst.type} needs an rng`);
  const grid = def.apply(boardOf(state), target, rng, inst);
  const hand = state.hand.slice();
  hand.splice(handIndex, 1);
  return {
    ...state,
    grid,
    hand,
    discard: state.discard.concat([{ ...inst, target }]),
    turn: state.turn + 1,
  };
}

// Stars for a finished game: 0 if lost; otherwise 1 to 3 by cards left over
// compared with the solver's best leftover count (par).
export function starsFor(state, par) {
  if (!isWin(state)) return 0;
  const left = state.hand.length;
  if (left >= par) return 3;
  if (left >= Math.ceil(par / 2)) return 2;
  return 1;
}

export function largestShareOf(state) {
  return largestShare(state.grid, state.colors);
}

export function countsOf(state) {
  return colorCounts(state.grid, state.colors);
}

// ------------------------------------------------------------------ session
// A session wraps a puzzle with the undo stack and the luck rng. Undo is
// unlimited back to the most recent luck card; playing a luck card commits
// everything before it. Restart replays the same board and hand with fresh
// luck rolls.

export function startSession(puzzle, restarts = 0) {
  const state = newState(puzzle);
  return {
    puzzle,
    restarts,
    state,
    history: [],        // previous states, oldest first
    commitIndex: 0,     // history entries before this index cannot be undone to
  };
}

function luckRng(session) {
  return new Rng(hashSeed(`${session.puzzle.seed}:luck:${session.restarts}:${session.state.turn}`));
}

export function playInSession(session, handIndex, target) {
  const inst = session.state.hand[handIndex];
  const def = cardDef(inst.type);
  const rng = def.isLuck ? luckRng(session) : null;
  const next = applyMove(session.state, handIndex, target, rng);
  const history = session.history.concat([session.state]);
  return {
    ...session,
    state: next,
    history,
    commitIndex: def.isLuck ? history.length : session.commitIndex,
  };
}

export function canUndo(session) {
  return session.history.length > session.commitIndex;
}

export function undoInSession(session) {
  if (!canUndo(session)) return session;
  const history = session.history.slice(0, -1);
  return { ...session, state: session.history[session.history.length - 1], history };
}

export function restartSession(session) {
  return startSession(session.puzzle, session.restarts + 1);
}

export function sessionStars(session) {
  return starsFor(session.state, session.puzzle.par);
}

// Replay a recorded line of { uid, target } moves from a puzzle's start and
// return the final state (deterministic cards only; luck cards use rng).
export function replay(puzzle, moves, rng, { assertLegal = false } = {}) {
  let state = newState(puzzle);
  for (const move of moves) {
    const i = state.hand.findIndex((c) => c.uid === move.uid);
    if (i < 0) throw new Error(`Card ${move.uid} not in hand`);
    if (assertLegal) {
      const want = JSON.stringify(move.target);
      if (!legalTargets(state, i).some((t) => JSON.stringify(t) === want)) {
        throw new Error(`Illegal target for ${state.hand[i].type} (${move.uid}) at turn ${state.turn}`);
      }
    }
    state = applyMove(state, i, move.target, rng);
  }
  return state;
}
