// Bots for the simulation harness (Node only). Each bot is
//   play(puzzle, rng) -> { won, length, stars, state, line }
// and plays the real engine through applyMove.

import { newState, applyMove, isWin, starsFor } from '../js/engine.js';
import { cardDef } from '../js/cards.js';
import { beamSolve, greedyMove, heuristic, expansions } from '../js/solver.js';
import { colorCounts } from '../js/grid.js';

function finish(puzzle, state, line) {
  return { won: isWin(state), length: line.length, stars: starsFor(state, puzzle.par), state, line };
}

function largestShare(state) {
  const counts = colorCounts(state.grid, state.colors);
  return Math.max(...counts) / state.grid.length;
}

// Luck targets worth considering (Scatter's thousands of subsets are pruned
// by the card's own solverTargets hook).
function luckTargets(state, handIndex, cap = 24) {
  const inst = state.hand[handIndex];
  const def = cardDef(inst.type);
  const board = { size: state.size, colors: state.colors, grid: state.grid };
  const targets = def.targets(board, inst);
  return def.solverTargets ? def.solverTargets(board, targets, cap) : targets;
}

// ------------------------------------------------------------------ Random

export function randomBot(puzzle, rng) {
  let state = newState(puzzle);
  const line = [];
  while (!isWin(state) && state.hand.length) {
    const playable = [];
    for (let i = 0; i < state.hand.length; i++) {
      const inst = state.hand[i];
      const def = cardDef(inst.type);
      const targets = inst.type === 'scatter' ? luckTargets(state, i, 200) : def.targets({ size: state.size, colors: state.colors, grid: state.grid }, inst);
      if (targets.length) playable.push({ i, targets });
    }
    if (!playable.length) break;
    const pick = rng.pick(playable);
    const target = rng.pick(pick.targets);
    line.push({ uid: state.hand[pick.i].uid, target });
    state = applyMove(state, pick.i, target, rng);
  }
  return finish(puzzle, state, line);
}

// ------------------------------------------------------------------ Greedy

export function greedyBot(puzzle, rng, { includeLuck = true } = {}) {
  let state = newState(puzzle);
  const line = [];
  while (!isWin(state) && state.hand.length) {
    const exp = greedyMove(state, { includeLuck, rng: rng.fork('g'), samples: 4 });
    if (!exp) break;
    line.push({ uid: exp.inst.uid, target: exp.target });
    state = applyMove(state, exp.handIndex, exp.target, rng);
  }
  return finish(puzzle, state, line);
}

// ------------------------------------------------------------------ Lookahead
// Two-ply: score every first move by the best heuristic reachable with one
// more deterministic card (wins score highest). Luck cards are judged by the
// average over a few sampled rolls.

function bestNextScore(state) {
  if (isWin(state)) return 1e6;
  if (!state.hand.length) return heuristic(state) - 1e3;
  let best = heuristic(state);
  for (const exp of expansions(state)) {
    const b = { size: state.size, colors: state.colors, grid: exp.grid };
    const s = isWinGrid(exp.grid) ? 1e5 : heuristic(b);
    if (s > best) best = s;
  }
  return best;
}

function isWinGrid(grid) {
  for (let i = 1; i < grid.length; i++) if (grid[i] !== grid[0]) return false;
  return true;
}

export function lookaheadBot(puzzle, rng, { firstPlyKeep = 14, samples = 4, includeLuck = true } = {}) {
  let state = newState(puzzle);
  const line = [];
  const sampleRng = rng.fork('la');
  while (!isWin(state) && state.hand.length) {
    // First ply: every deterministic expansion plus pruned luck targets.
    const firsts = [];
    for (const exp of expansions(state)) {
      const b = { size: state.size, colors: state.colors, grid: exp.grid };
      firsts.push({ exp, luck: false, score: isWinGrid(exp.grid) ? 1e6 : heuristic(b) });
    }
    if (includeLuck) {
      for (let i = 0; i < state.hand.length; i++) {
        const inst = state.hand[i];
        if (!cardDef(inst.type).isLuck) continue;
        for (const target of luckTargets(state, i)) {
          firsts.push({ exp: { handIndex: i, inst, target }, luck: true, score: -Infinity });
        }
      }
    }
    if (!firsts.length) break;
    // Second ply on the most promising first moves (all luck targets get
    // sampled, since their first-ply score is unknown).
    firsts.sort((a, b) => b.score - a.score);
    const toSearch = firsts.filter((f) => !f.luck).slice(0, firstPlyKeep).concat(firsts.filter((f) => f.luck));
    let best = null;
    let bestScore = -Infinity;
    for (const f of toSearch) {
      let score;
      if (f.luck) {
        let total = 0;
        for (let s = 0; s < samples; s++) {
          const next = applyMove(state, f.exp.handIndex, f.exp.target, sampleRng);
          total += bestNextScore(next);
        }
        score = total / samples - 0.5;
      } else {
        const next = applyMove(state, f.exp.handIndex, f.exp.target);
        score = bestNextScore(next);
      }
      if (score > bestScore) {
        bestScore = score;
        best = f.exp;
      }
    }
    line.push({ uid: best.inst.uid, target: best.target });
    state = applyMove(state, best.handIndex, best.target, rng);
  }
  return finish(puzzle, state, line);
}

// ------------------------------------------------------------------ Solver
// Beam search, deterministic cards only. Falls back to greedy if the beam
// finds no win (which cannot happen for a verified puzzle).

export function solverBot(puzzle, rng, { beamWidth = 48 } = {}) {
  const result = beamSolve(puzzle, { beamWidth });
  if (result.won) {
    let state = newState(puzzle);
    for (const move of result.bestLine) {
      const i = state.hand.findIndex((c) => c.uid === move.uid);
      state = applyMove(state, i, move.target);
    }
    return { ...finish(puzzle, state, result.bestLine), lines: result.lines };
  }
  return { ...greedyBot(puzzle, rng), lines: 0 };
}

// ------------------------------------------------------------------ Solver EV
// May play luck cards: at each decision it compares the certain outcome of
// the deterministic solver with the expected outcome (over sampled rolls)
// of each luck play, and gambles only when the expectation is better.

export function solverEvBot(puzzle, rng, { beamWidth = 48, subBeam = 12, samples = 5, maxLuckTargets = 10 } = {}) {
  let state = newState(puzzle);
  const line = [];
  const sampleRng = rng.fork('ev');
  while (!isWin(state) && state.hand.length) {
    const det = beamSolve(state, { beamWidth });
    const certainLeft = det.won ? state.hand.length - det.bestLength : -1;
    const certainStars = det.won ? starsFor({ ...state, hand: state.hand.slice(det.bestLength) }, puzzle.par) : 0;
    // Candidate luck plays, pruned by one-roll heuristic.
    let bestLuck = null;
    let bestLuckStars = certainStars;
    for (let i = 0; i < state.hand.length; i++) {
      const inst = state.hand[i];
      if (!cardDef(inst.type).isLuck) continue;
      const targets = luckTargets(state, i)
        .map((target) => ({ target, h: heuristic({ size: state.size, colors: state.colors, grid: applyMove(state, i, target, sampleRng).grid }) }))
        .sort((a, b) => b.h - a.h)
        .slice(0, maxLuckTargets);
      for (const { target } of targets) {
        let total = 0;
        for (let s = 0; s < samples; s++) {
          const next = applyMove(state, i, target, sampleRng);
          if (isWin(next)) { total += starsFor(next, puzzle.par); continue; }
          const sub = beamSolve(next, { beamWidth: subBeam });
          if (sub.won) total += starsFor({ ...next, hand: next.hand.slice(sub.bestLength) }, puzzle.par);
        }
        const ev = total / samples;
        if (ev > bestLuckStars + 0.05) {
          bestLuckStars = ev;
          bestLuck = { handIndex: i, target };
        }
      }
    }
    if (bestLuck) {
      line.push({ uid: state.hand[bestLuck.handIndex].uid, target: bestLuck.target });
      state = applyMove(state, bestLuck.handIndex, bestLuck.target, rng);
      continue;
    }
    if (det.won) {
      for (const move of det.bestLine) {
        const i = state.hand.findIndex((c) => c.uid === move.uid);
        line.push(move);
        state = applyMove(state, i, move.target);
      }
      break;
    }
    // No certain win and no worthwhile gamble: play greedy.
    const exp = greedyMove(state, { includeLuck: true, rng: sampleRng });
    if (!exp) break;
    line.push({ uid: exp.inst.uid, target: exp.target });
    state = applyMove(state, exp.handIndex, exp.target, rng);
  }
  const r = finish(puzzle, state, line);
  return { ...r, largestShare: largestShare(state) };
}

export const BOTS = {
  random: randomBot,
  greedy: greedyBot,
  greedyDet: (p, r) => greedyBot(p, r, { includeLuck: false }),
  lookahead: lookaheadBot,
  lookaheadDet: (p, r) => lookaheadBot(p, r, { includeLuck: false }),
  solver: solverBot,
  solverEv: solverEvBot,
};
