// Forward solver and the greedy baseline policy. Pure and DOM-free.
//
// beamSolve(puzzleOrState, opts) plays the dealt hand forward using
// deterministic cards only and reports the shortest win it finds. It is used
// by the generator to verify every board and to set par, and by the sims as
// the near-optimal bot.

import { cardDef } from './cards.js';
import { isUniform, gridsEqual, gridKey } from './grid.js';
import { newState, applyMove } from './engine.js';

// Higher is better. Combines the largest color's share, the number of
// colors still on the board and the number of groups.
export function heuristic(board) {
  const grid = board.grid;
  const counts = new Array(board.colors).fill(0);
  for (let i = 0; i < grid.length; i++) counts[grid[i]]++;
  let best = 0;
  let present = 0;
  for (let c = 0; c < counts.length; c++) {
    const n = counts[c];
    if (n > best) best = n;
    if (n > 0) present++;
  }
  const share = best / grid.length;
  // Same-color neighbor pairs: a cheap stand-in for "few, large groups".
  const size = board.size;
  let same = 0;
  for (let i = 0; i < grid.length; i++) {
    const c = i % size;
    if (c < size - 1 && grid[i] === grid[i + 1]) same++;
    if (i + size < grid.length && grid[i] === grid[i + size]) same++;
  }
  return share * 20 - present * 10 + (same / (2 * size * (size - 1))) * 6;
}

export function cardIsLuck(inst) {
  return cardDef(inst.type).isLuck;
}

// Every (handIndex, target, grid) expansion from a state, deterministic cards
// only unless includeLuck, skipping deterministic no-ops.
export function* expansions(state, { includeLuck = false, rng = null } = {}) {
  const board = { size: state.size, colors: state.colors, grid: state.grid };
  for (let i = 0; i < state.hand.length; i++) {
    const inst = state.hand[i];
    const def = cardDef(inst.type);
    if (def.isLuck && !includeLuck) continue;
    let targets = def.targets(board, inst);
    if (def.isLuck && def.solverTargets) targets = def.solverTargets(board, targets);
    for (const target of targets) {
      const grid = def.apply(board, target, rng, inst);
      if (!def.isLuck && gridsEqual(grid, state.grid)) continue;
      yield { handIndex: i, inst, target, grid };
    }
  }
}

// Beam search over card order and targets, deterministic cards only.
// opts: beamWidth, maxLines (cap on distinct winning lines to count),
//       stopAtFirstDepth (default true: stop after the depth of the first win)
// Returns { won, bestLength, bestLine, lines, nodes, depthReached }.
export function beamSolve(puzzleOrState, opts = {}) {
  const { beamWidth = 48, maxLines = 50, stopAtFirstDepth = true, maxDepth = Infinity } = opts;
  const start = puzzleOrState.hand && puzzleOrState.discard ? puzzleOrState : newState(puzzleOrState);
  if (isUniform(start.grid)) return { won: true, bestLength: 0, bestLine: [], lines: 1, nodes: 0, depthReached: 0 };
  const cards = start.hand
    .map((inst, i) => ({ inst, def: cardDef(inst.type), bit: 1 << i }))
    .filter((c) => !c.def.isLuck);
  const { size, colors } = start;
  let fullMask = 0;
  for (const c of cards) fullMask |= c.bit;
  // A node is { grid, mask (cards still in hand), parent, move, score }.
  let beam = [{ grid: start.grid, mask: fullMask, parent: null, move: null }];
  const seen = new Set([gridKey(start.grid) + fullMask]);
  let nodes = 0;
  let bestLength = Infinity;
  let bestLine = null;
  let lines = 0;
  const maxTurns = Math.min(maxDepth, cards.length);
  const lineOf = (node, lastMove) => {
    const out = [lastMove];
    for (let n = node; n && n.move; n = n.parent) out.push(n.move);
    return out.reverse();
  };
  for (let depth = 1; depth <= maxTurns && beam.length; depth++) {
    const scored = [];
    for (const node of beam) {
      const board = { size, colors, grid: node.grid };
      for (const card of cards) {
        if (!(node.mask & card.bit)) continue;
        let targets = card.def.targets(board, card.inst);
        if (card.def.solverTargets) targets = card.def.solverTargets(board, targets);
        for (const target of targets) {
          const grid = card.def.apply(board, target, null, card.inst);
          nodes++;
          if (gridsEqual(grid, node.grid)) continue;
          if (isUniform(grid)) {
            if (depth < bestLength) {
              bestLength = depth;
              bestLine = lineOf(node, { uid: card.inst.uid, target });
            }
            if (lines < maxLines) lines++;
            continue;
          }
          const mask = node.mask & ~card.bit;
          if (mask === 0) continue;
          scored.push({ grid, mask, parent: node, move: { uid: card.inst.uid, target }, score: heuristic({ size, colors, grid }) });
        }
      }
    }
    if (bestLine && stopAtFirstDepth) return { won: true, bestLength, bestLine, lines, nodes, depthReached: depth };
    scored.sort((a, b) => b.score - a.score);
    // Dedupe only as far down the sorted list as the beam reaches.
    const next = [];
    for (let i = 0; i < scored.length && next.length < beamWidth; i++) {
      const cand = scored[i];
      const key = gridKey(cand.grid) + cand.mask;
      if (seen.has(key)) continue;
      seen.add(key);
      next.push(cand);
    }
    beam = next;
  }
  return { won: bestLine != null, bestLength, bestLine, lines, nodes, depthReached: maxTurns };
}

function shareScore(board) {
  const grid = board.grid;
  const counts = new Array(board.colors).fill(0);
  for (let i = 0; i < grid.length; i++) counts[grid[i]]++;
  let best = 0;
  for (const n of counts) if (n > best) best = n;
  // Share dominates; the heuristic breaks ties.
  return best * 1000 + heuristic(board);
}

// Greedy policy: the expansion that most increases the largest color's share
// (ties broken by the full heuristic). Returns null when nothing can be played.
export function greedyMove(state, { includeLuck = false, rng = null, samples = 4 } = {}) {
  let best = null;
  let bestScore = -Infinity;
  const board = { size: state.size, colors: state.colors, grid: state.grid };
  for (const exp of expansions(state, { includeLuck, rng })) {
    let score;
    const def = cardDef(exp.inst.type);
    if (def.isLuck) {
      // Average a few rolls so a luck card is judged by its expectation.
      let total = 0;
      for (let s = 0; s < samples; s++) total += shareScore({ size: board.size, colors: board.colors, grid: def.apply(board, exp.target, rng, exp.inst) });
      score = total / samples - 0.01; // mild preference for certainty
    } else {
      score = shareScore({ size: state.size, colors: state.colors, grid: exp.grid });
    }
    if (score > bestScore) {
      bestScore = score;
      best = exp;
    }
  }
  return best;
}

// Play a state to the end with the greedy policy (deterministic cards only
// unless includeLuck). Returns { won, length, state }.
export function greedyPlay(puzzleOrState, opts = {}) {
  let state = puzzleOrState.hand && puzzleOrState.discard ? puzzleOrState : newState(puzzleOrState);
  let length = 0;
  while (!isUniform(state.grid) && state.hand.length) {
    const exp = greedyMove(state, opts);
    if (!exp) break;
    state = applyMove(state, exp.handIndex, exp.target, opts.rng);
    length++;
  }
  return { won: isUniform(state.grid), length, state };
}
