// Card catalog. Each card is data plus pure functions:
//   targets(board, inst) -> every legal target for the current board
//   apply(board, target, rng, inst) -> a new grid (never mutates the old one)
//   invert(board, rng, inst) -> { grid, target } predecessor for deterministic
//     cards (applying the card with `target` to `grid` restores board.grid),
//     or null if no inverse applies
//   label(target, board) -> short text for the UI
//
// A board is { size, colors, grid }. A target always carries `cells` (the
// cells the player taps or that the effect covers) plus the card's own
// parameters: color, color2, line, dir, axis, side.
//
// `inst` is the card instance in a hand: { uid, type, lockedColor }. A locked
// card has its lockParam fixed to lockedColor. Any palette color may be
// chosen even when it has left the board; only luck cards' random results are
// limited to colors still present.

import {
  idx, rowOf, colOf, lines, lineCells, diagonals, neighbors, colorCounts,
  colorsPresent, groupOf, groupsOf, fringe, halfCells, mirrorCell, blocks2x2,
  randomConnectedSubset, isUniform, gridsEqual,
} from './grid.js';

const DIRS = { row: ['left', 'right'], col: ['up', 'down'] };

function colorChoices(board, inst) {
  if (inst && inst.lockedColor != null) return [inst.lockedColor];
  const out = [];
  for (let c = 0; c < board.colors; c++) out.push(c);
  return out;
}

function allColors(board) {
  const out = [];
  for (let c = 0; c < board.colors; c++) out.push(c);
  return out;
}

function paintCells(grid, cells, color) {
  const out = grid.slice();
  for (const c of cells) out[c] = color;
  return out;
}

function randomizeCells(grid, cells, rng, colors, avoidAllOf) {
  // Fill cells with random colors; if avoidAllOf is given, make sure the cells
  // are not all that color (so the forward card is not a no-op).
  const out = grid.slice();
  for (let attempt = 0; attempt < 20; attempt++) {
    for (const c of cells) {
      // Lean away from the color being undone so boards mix faster.
      let v = rng.int(colors);
      if (avoidAllOf != null && v === avoidAllOf && rng.chance(0.7)) v = (v + 1 + rng.int(colors - 1)) % colors;
      out[c] = v;
    }
    if (avoidAllOf == null || cells.some((c) => out[c] !== avoidAllOf)) return out;
  }
  out[cells[0]] = (avoidAllOf + 1) % colors;
  return out;
}

function lineName(line) {
  return `${line.kind === 'row' ? 'Row' : 'Column'} ${line.index + 1}`;
}

function uniformLines(board, lineList) {
  return lineList.filter((l) => {
    const c0 = board.grid[l.cells[0]];
    return l.cells.every((i) => board.grid[i] === c0);
  });
}

function colorName(board, c) {
  return board.colorNames ? board.colorNames[c] : `color ${c + 1}`;
}

// ---------------------------------------------------------------- line paints

function makeLinePaint(id, name, kind) {
  return {
    id,
    name,
    text: `Every cell in a ${kind === 'row' ? 'row' : 'column'} becomes the color you choose.`,
    isLuck: false,
    lockParam: 'color',
    targets(board, inst) {
      const out = [];
      const colors = colorChoices(board, inst);
      for (const line of lines(board.size)) {
        if (line.kind !== kind) continue;
        for (const color of colors) out.push({ cells: line.cells, line: { kind, index: line.index }, color });
      }
      return out;
    },
    apply(board, target) {
      return paintCells(board.grid, target.cells, target.color);
    },
    invert(board, rng, inst) {
      const candidates = uniformLines(board, lines(board.size).filter((l) => l.kind === kind))
        .filter((l) => inst == null || inst.lockedColor == null || board.grid[l.cells[0]] === inst.lockedColor);
      if (!candidates.length) return null;
      const line = rng.pick(candidates);
      const color = board.grid[line.cells[0]];
      const grid = randomizeCells(board.grid, line.cells, rng, board.colors, color);
      if (!grid) return null;
      return { grid, target: { cells: line.cells, line: { kind, index: line.index }, color } };
    },
    label(target, board) {
      return `${lineName(target.line)} → ${colorName(board, target.color)}`;
    },
  };
}

export const rowPaint = makeLinePaint('rowPaint', 'Row Paint', 'row');
export const colPaint = makeLinePaint('colPaint', 'Column Paint', 'col');

export const diagPaint = {
  id: 'diagPaint',
  name: 'Diagonal Paint',
  text: 'Every cell on a diagonal of three or more cells becomes the color you choose.',
  isLuck: false,
  lockParam: 'color',
  targets(board, inst) {
    const out = [];
    const colors = colorChoices(board, inst);
    for (const d of diagonals(board.size, 3)) {
      for (const color of colors) out.push({ cells: d.cells, line: { kind: d.kind, index: d.index }, color });
    }
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng, inst) {
    const candidates = diagonals(board.size, 3)
      .filter((d) => d.cells.every((i) => board.grid[i] === board.grid[d.cells[0]]))
      .filter((d) => inst == null || inst.lockedColor == null || board.grid[d.cells[0]] === inst.lockedColor);
    if (!candidates.length) return null;
    const d = rng.pick(candidates);
    const color = board.grid[d.cells[0]];
    const grid = randomizeCells(board.grid, d.cells, rng, board.colors, color);
    if (!grid) return null;
    return { grid, target: { cells: d.cells, line: { kind: d.kind, index: d.index }, color } };
  },
  label(target, board) {
    return `Diagonal (${target.cells.length}) → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- transmute

export const transmute = {
  id: 'transmute',
  name: 'Transmute',
  text: 'Every gem of one color becomes another color.',
  isLuck: false,
  lockParam: 'color2',
  targets(board, inst) {
    const present = colorsPresent(board.grid, board.colors);
    const tos = colorChoices(board, inst);
    const out = [];
    for (const from of present) {
      const cells = cellsOfColor(board.grid, from);
      for (const to of tos) {
        if (to === from) continue;
        out.push({ cells, color: from, color2: to });
      }
    }
    return out;
  },
  apply(board, target) {
    const out = board.grid.slice();
    for (let i = 0; i < out.length; i++) if (out[i] === target.color) out[i] = target.color2;
    return out;
  },
  invert(board, rng, inst) {
    const present = colorsPresent(board.grid, board.colors);
    const absent = [];
    for (let c = 0; c < board.colors; c++) if (!present.includes(c)) absent.push(c);
    if (!absent.length) return null;
    const tos = inst && inst.lockedColor != null ? present.filter((c) => c === inst.lockedColor) : present;
    if (!tos.length) return null;
    const to = rng.pick(tos);
    const from = rng.pick(absent);
    const toCells = cellsOfColor(board.grid, to);
    // Recolor a random non-empty subset of the `to` cells back to `from`.
    if (toCells.length < 2) return null;
    const grid = board.grid.slice();
    let moved = 0;
    for (const c of toCells) if (rng.chance(0.5)) { grid[c] = from; moved++; }
    if (moved === 0) { grid[rng.pick(toCells)] = from; moved = 1; }
    if (moved === toCells.length) grid[rng.pick(toCells)] = to;
    return { grid, target: { cells: cellsOfColor(grid, from), color: from, color2: to } };
  },
  label(target, board) {
    return `${colorName(board, target.color)} → ${colorName(board, target.color2)}`;
  },
};

function cellsOfColor(grid, color) {
  const out = [];
  for (let i = 0; i < grid.length; i++) if (grid[i] === color) out.push(i);
  return out;
}

// ---------------------------------------------------------------- color swap (two groups)

export const colorSwap = {
  id: 'colorSwap',
  name: 'Color Swap',
  text: 'Two groups of different colors trade colors.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const groups = groupsOf(board);
    const out = [];
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        if (board.grid[groups[i][0]] === board.grid[groups[j][0]]) continue;
        out.push({ cells: groups[i].concat(groups[j]).sort((a, b) => a - b), cellsA: groups[i], cellsB: groups[j] });
      }
    }
    return out;
  },
  apply(board, target) {
    const out = board.grid.slice();
    const a = board.grid[target.cellsA[0]];
    const b = board.grid[target.cellsB[0]];
    for (const c of target.cellsA) out[c] = b;
    for (const c of target.cellsB) out[c] = a;
    return out;
  },
  invert(board, rng) {
    const targets = colorSwap.targets(board);
    if (!targets.length) return null;
    for (let attempt = 0; attempt < 10; attempt++) {
      const t = rng.pick(targets);
      const grid = colorSwap.apply(board, t);
      // Both groups must still be whole groups in the predecessor.
      const gA = groupOf(grid, board.size, t.cellsA[0]);
      const gB = groupOf(grid, board.size, t.cellsB[0]);
      if (gA.length !== t.cellsA.length || gB.length !== t.cellsB.length) continue;
      return { grid, target: { cells: t.cells, cellsA: gA, cellsB: gB } };
    }
    return null;
  },
  label(target, board) {
    return `${colorName(board, board.grid[target.cellsA[0]])} group of ${target.cellsA.length} ⇄ ${colorName(board, board.grid[target.cellsB[0]])} group of ${target.cellsB.length}`;
  },
};

// ---------------------------------------------------------------- flood

export const flood = {
  id: 'flood',
  name: 'Flood',
  text: 'A connected group of same-color gems becomes the color you choose.',
  isLuck: false,
  lockParam: 'color',
  targets(board, inst) {
    const colors = colorChoices(board, inst);
    const out = [];
    for (const g of groupsOf(board)) {
      for (const color of colors) out.push({ cells: g, color });
    }
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng, inst) {
    const groups = groupsOf(board).filter(
      (g) => inst == null || inst.lockedColor == null || board.grid[g[0]] === inst.lockedColor,
    );
    if (!groups.length) return null;
    for (let attempt = 0; attempt < 8; attempt++) {
      const g = rng.pick(groups);
      const gColor = board.grid[g[0]];
      const sub = randomConnectedSubset(board.size, g, rng);
      // The subset must be a maximal group of its new color in the predecessor:
      // no neighbor outside the subset may share that color.
      const forbidden = new Set([gColor]);
      for (const n of fringe(board.size, sub)) forbidden.add(board.grid[n]);
      const allowed = [];
      for (let c = 0; c < board.colors; c++) if (!forbidden.has(c)) allowed.push(c);
      if (!allowed.length) continue;
      const newColor = rng.pick(allowed);
      const grid = paintCells(board.grid, sub, newColor);
      return { grid, target: { cells: sub, color: gColor } };
    }
    return null;
  },
  label(target, board) {
    return `Group of ${target.cells.length} → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- spread

export const SPREAD_MAX = 8;

export const spread = {
  id: 'spread',
  name: 'Spread',
  text: `Every gem touching a group of up to ${SPREAD_MAX} takes the group's color.`,
  isLuck: false,
  lockParam: null,
  targets(board) {
    return groupsOf(board).filter((g) => g.length <= SPREAD_MAX).map((g) => ({ cells: g }));
  },
  apply(board, target) {
    const color = board.grid[target.cells[0]];
    return paintCells(board.grid, fringe(board.size, target.cells), color);
  },
  invert(board, rng) {
    const groups = groupsOf(board);
    for (let attempt = 0; attempt < 8; attempt++) {
      const h = rng.pick(groups);
      const inH = new Set(h);
      // Interior cells: every neighbor is inside the group.
      const interior = h.filter((c) => neighbors(board.size, c).every((n) => inH.has(n)));
      if (!interior.length) continue;
      // Grow a connected subset of interior cells; it must leave a non-empty fringe.
      const maxSize = Math.max(1, Math.min(interior.length, h.length - 1, SPREAD_MAX));
      const comp = connectedComponentsWithin(board.size, interior);
      const pool = rng.pick(comp);
      const g = randomConnectedSubset(board.size, pool, rng, maxSize);
      const ring = fringe(board.size, g);
      if (!ring.length) continue;
      const color = board.grid[h[0]];
      const grid = board.grid.slice();
      for (const c of ring) {
        let v = rng.int(board.colors);
        if (v === color) v = (v + 1 + rng.int(board.colors - 1)) % board.colors;
        grid[c] = v;
      }
      return { grid, target: { cells: g } };
    }
    return null;
  },
  label(target) {
    return `Spread group of ${target.cells.length}`;
  },
};

function connectedComponentsWithin(size, cells) {
  const allowed = new Set(cells);
  const seen = new Set();
  const comps = [];
  for (const start of cells) {
    if (seen.has(start)) continue;
    const comp = [];
    const stack = [start];
    seen.add(start);
    while (stack.length) {
      const cur = stack.pop();
      comp.push(cur);
      for (const n of neighbors(size, cur)) {
        if (allowed.has(n) && !seen.has(n)) {
          seen.add(n);
          stack.push(n);
        }
      }
    }
    comps.push(comp.sort((a, b) => a - b));
  }
  return comps;
}

// ---------------------------------------------------------------- stamp

export const stamp = {
  id: 'stamp',
  name: 'Stamp',
  text: 'A 2×2 block becomes the color you choose.',
  isLuck: false,
  lockParam: 'color',
  targets(board, inst) {
    const colors = colorChoices(board, inst);
    const out = [];
    for (const block of blocks2x2(board.size)) for (const color of colors) out.push({ cells: block, color });
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng, inst) {
    const candidates = blocks2x2(board.size)
      .filter((b) => b.every((i) => board.grid[i] === board.grid[b[0]]))
      .filter((b) => inst == null || inst.lockedColor == null || board.grid[b[0]] === inst.lockedColor);
    if (!candidates.length) return null;
    const block = rng.pick(candidates);
    const color = board.grid[block[0]];
    const grid = randomizeCells(board.grid, block, rng, board.colors, color);
    if (!grid) return null;
    return { grid, target: { cells: block, color } };
  },
  label(target, board) {
    const r = rowOf(board.size, target.cells[0]) + 1;
    const c = colOf(board.size, target.cells[0]) + 1;
    return `Block at ${r},${c} → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- majority rule

function topColors(grid, cells, colors) {
  const counts = new Array(colors).fill(0);
  for (const i of cells) counts[grid[i]]++;
  let best = 0;
  for (const n of counts) if (n > best) best = n;
  const out = [];
  for (let c = 0; c < colors; c++) if (counts[c] === best) out.push(c);
  return out;
}

export const majority = {
  id: 'majority',
  name: 'Majority Rule',
  text: 'A row or column becomes its most common color. You break ties.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const out = [];
    for (const line of lines(board.size)) {
      for (const color of topColors(board.grid, line.cells, board.colors)) {
        out.push({ cells: line.cells, line: { kind: line.kind, index: line.index }, color });
      }
    }
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng) {
    const candidates = uniformLines(board, lines(board.size));
    if (!candidates.length) return null;
    const line = rng.pick(candidates);
    const color = board.grid[line.cells[0]];
    const grid = randomizeCells(board.grid, line.cells, rng, board.colors, color);
    // Raise the count of `color` until it is at least tied for the most common.
    for (let guard = 0; guard < 64; guard++) {
      const counts = new Array(board.colors).fill(0);
      for (const i of line.cells) counts[grid[i]]++;
      let best = 0;
      for (const n of counts) if (n > best) best = n;
      if (counts[color] === best) break;
      const others = line.cells.filter((i) => grid[i] !== color);
      grid[rng.pick(others)] = color;
    }
    if (line.cells.every((i) => grid[i] === color)) {
      // Keep at least one cell different so the card is not a no-op.
      const i = rng.pick(line.cells);
      grid[i] = (color + 1 + rng.int(board.colors - 1)) % board.colors;
      // That may break the majority; if so, retry.
      if (!topColors(grid, line.cells, board.colors).includes(color)) return majority.invert(board, rng);
    }
    return { grid, target: { cells: line.cells, line: { kind: line.kind, index: line.index }, color } };
  },
  label(target, board) {
    return `${lineName(target.line)} → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- slide

// Shift a line by `shift` cells toward the end (right for rows, down for
// columns), wrapping around. A shift of n - k is a shift of k the other way.
function slideLine(grid, cells, shift) {
  const out = grid.slice();
  const n = cells.length;
  for (let k = 0; k < n; k++) out[cells[k]] = grid[cells[(k - shift + n) % n]];
  return out;
}

export function slideLabel(line, shift, n) {
  const forward = shift <= n / 2;
  const steps = forward ? shift : n - shift;
  const arrow = line.kind === 'row' ? (forward ? '→' : '←') : (forward ? '↓' : '↑');
  return `${arrow} ${steps}`;
}

export const slide = {
  id: 'slide',
  name: 'Slide',
  text: 'A row or column shifts any number of cells; gems that fall off wrap around.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const out = [];
    const n = board.size;
    for (const line of lines(n)) {
      for (let shift = 1; shift < n; shift++) out.push({ cells: line.cells, line: { kind: line.kind, index: line.index }, shift });
    }
    return out;
  },
  apply(board, target) {
    return slideLine(board.grid, target.cells, target.shift);
  },
  invert(board, rng) {
    const n = board.size;
    const candidates = lines(n).filter((l) => !l.cells.every((i) => board.grid[i] === board.grid[l.cells[0]]));
    if (!candidates.length) return null;
    for (let attempt = 0; attempt < 8; attempt++) {
      const line = rng.pick(candidates);
      const shift = rng.range(1, n - 1);
      const grid = slideLine(board.grid, line.cells, n - shift);
      if (line.cells.every((i) => grid[i] === board.grid[i])) continue;
      return { grid, target: { cells: line.cells, line: { kind: line.kind, index: line.index }, shift } };
    }
    return null;
  },
  label(target, board) {
    return `${lineName(target.line)} ${slideLabel(target.line, target.shift, board.size)}`;
  },
};

// ---------------------------------------------------------------- trade

export const trade = {
  id: 'trade',
  name: 'Trade',
  text: 'Two gems swap places.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const out = [];
    const n = board.grid.length;
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) if (board.grid[a] !== board.grid[b]) out.push({ cells: [a, b] });
    }
    return out;
  },
  // Solver-only pruning: keep trades that put a gem next to one of its own
  // color (the trades that can set up a Flood, Spread or Majority Rule).
  solverTargets(board, targets) {
    const { grid, size } = board;
    return targets.filter((t) => {
      const [a, b] = t.cells;
      return touchesColor(grid, size, a, grid[b]) || touchesColor(grid, size, b, grid[a]);
    });
  },
  apply(board, target) {
    const out = board.grid.slice();
    const [a, b] = target.cells;
    out[a] = board.grid[b];
    out[b] = board.grid[a];
    return out;
  },
  invert(board, rng) {
    const targets = trade.targets(board);
    if (!targets.length) return null;
    const target = rng.pick(targets);
    return { grid: trade.apply(board, target), target };
  },
  label(target, board) {
    const [a, b] = target.cells;
    const s = board.size;
    return `Swap ${rowOf(s, a) + 1},${colOf(s, a) + 1} with ${rowOf(s, b) + 1},${colOf(s, b) + 1}`;
  },
};

function touchesColor(grid, size, i, color) {
  for (const n of neighbors(size, i)) if (grid[n] === color) return true;
  return false;
}

// ---------------------------------------------------------------- mirror

const SIDES = { v: ['left', 'right'], h: ['top', 'bottom'] };

export const mirror = {
  id: 'mirror',
  name: 'Mirror',
  text: 'One half of the board is copied onto the other half, reflected.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const out = [];
    for (const axis of ['v', 'h']) {
      for (const side of SIDES[axis]) out.push({ cells: halfCells(board.size, axis, side), axis, side });
    }
    return out;
  },
  apply(board, target) {
    const out = board.grid.slice();
    for (const d of target.cells) out[d] = board.grid[mirrorCell(board.size, target.axis, d)];
    return out;
  },
  invert(board, rng) {
    const candidates = mirror.targets(board).filter((t) =>
      t.cells.every((d) => board.grid[d] === board.grid[mirrorCell(board.size, t.axis, d)]),
    );
    if (!candidates.length) return null;
    const target = rng.pick(candidates);
    // Randomize the destination half so that it no longer mirrors the source.
    const grid = board.grid.slice();
    for (let attempt = 0; attempt < 20; attempt++) {
      for (const d of target.cells) grid[d] = rng.int(board.colors);
      if (target.cells.some((d) => grid[d] !== grid[mirrorCell(board.size, target.axis, d)])) break;
    }
    return { grid, target };
  },
  label(target) {
    const names = { left: 'Left half', right: 'Right half', top: 'Top half', bottom: 'Bottom half' };
    return `Overwrite ${names[target.side].toLowerCase()}`;
  },
};

// ---------------------------------------------------------------- group paint

export const GROUP_SIZES = [3, 4, 5];

function groupsOfSize(board, n) {
  return groupsOf(board).filter((g) => g.length === n);
}

export const groupPaint = {
  id: 'groupPaint',
  name: 'Group Paint',
  text: 'Every group of exactly 3, 4 or 5 gems (your pick) becomes the color you choose.',
  isLuck: false,
  lockParam: 'color',
  targets(board, inst) {
    const out = [];
    for (const n of GROUP_SIZES) {
      const gs = groupsOfSize(board, n);
      if (!gs.length) continue;
      const cells = gs.flat().sort((a, b) => a - b);
      for (const color of colorChoices(board, inst)) out.push({ cells, groupSize: n, color });
    }
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng, inst) {
    const present = colorsPresent(board.grid, board.colors).filter((c) => inst == null || inst.lockedColor == null || c === inst.lockedColor);
    if (!present.length) return null;
    for (let attempt = 0; attempt < 12; attempt++) {
      const color = rng.pick(present);
      const n = rng.pick(GROUP_SIZES);
      const groups = groupsOf(board).filter((g) => board.grid[g[0]] === color && g.length >= n);
      if (!groups.length) continue;
      // Carve one or two regions of exactly n cells out of same-color groups
      // and give each a different color.
      const grid = board.grid.slice();
      const regions = rng.range(1, 2);
      let carved = 0;
      for (let r = 0; r < regions; r++) {
        const g = rng.pick(groups);
        const region = randomConnectedSubset(board.size, g.filter((c) => grid[c] === color), rng, n);
        if (region.length !== n) continue;
        const forbidden = new Set([color]);
        for (const f of fringe(board.size, region)) forbidden.add(grid[f]);
        const allowed = allColors(board).filter((c) => !forbidden.has(c));
        if (!allowed.length) continue;
        const newColor = rng.pick(allowed);
        for (const c of region) grid[c] = newColor;
        carved++;
      }
      if (!carved) continue;
      const pred = { size: board.size, colors: board.colors, grid };
      const cells = groupsOfSize(pred, n).flat().sort((a, b) => a - b);
      const target = { cells, groupSize: n, color };
      if (gridsEqual(groupPaint.apply(pred, target), board.grid)) return { grid, target };
    }
    return null;
  },
  label(target, board) {
    return `Groups of ${target.groupSize} → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- corners

function cornerCells(size) {
  return [0, size - 1, size * (size - 1), size * size - 1];
}

export const corners = {
  id: 'corners',
  name: 'Corners',
  text: 'All four corner gems become the color you choose.',
  isLuck: false,
  lockParam: 'color',
  targets(board, inst) {
    const cells = cornerCells(board.size);
    return colorChoices(board, inst).map((color) => ({ cells, color }));
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng, inst) {
    const cells = cornerCells(board.size);
    const color = board.grid[cells[0]];
    if (!cells.every((i) => board.grid[i] === color)) return null;
    if (inst && inst.lockedColor != null && inst.lockedColor !== color) return null;
    const grid = randomizeCells(board.grid, cells, rng, board.colors, color);
    return { grid, target: { cells, color } };
  },
  label(target, board) {
    return `Corners → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- row / column mirror

function reverseLine(grid, cells) {
  const out = grid.slice();
  const n = cells.length;
  for (let k = 0; k < n; k++) out[cells[k]] = grid[cells[n - 1 - k]];
  return out;
}

function makeLineMirror(id, name, kind) {
  const card = {
    id,
    name,
    text: `A ${kind === 'row' ? 'row' : 'column'} is reversed end to end.`,
    isLuck: false,
    lockParam: null,
    targets(board) {
      return lines(board.size).filter((l) => l.kind === kind).map((l) => ({ cells: l.cells, line: { kind, index: l.index } }));
    },
    apply(board, target) {
      return reverseLine(board.grid, target.cells);
    },
    invert(board, rng) {
      const candidates = card.targets(board).filter((t) => !gridsEqual(reverseLine(board.grid, t.cells), board.grid));
      if (!candidates.length) return null;
      const target = rng.pick(candidates);
      return { grid: reverseLine(board.grid, target.cells), target };
    },
    label(target) {
      return `Reverse ${lineName(target.line).toLowerCase()}`;
    },
  };
  return card;
}

export const rowMirror = makeLineMirror('rowMirror', 'Row Mirror', 'row');
export const colMirror = makeLineMirror('colMirror', 'Column Mirror', 'col');

// ---------------------------------------------------------------- minority rule

function bottomColors(grid, cells, colors) {
  const counts = new Array(colors).fill(0);
  for (const i of cells) counts[grid[i]]++;
  let least = Infinity;
  for (const n of counts) if (n > 0 && n < least) least = n;
  const out = [];
  for (let c = 0; c < colors; c++) if (counts[c] === least) out.push(c);
  return out;
}

export const minority = {
  id: 'minority',
  name: 'Minority Rule',
  text: 'A row or column becomes its least common color. You break ties.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const out = [];
    for (const line of lines(board.size)) {
      for (const color of bottomColors(board.grid, line.cells, board.colors)) {
        out.push({ cells: line.cells, line: { kind: line.kind, index: line.index }, color });
      }
    }
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng) {
    const candidates = uniformLines(board, lines(board.size));
    if (!candidates.length || board.colors < 2) return null;
    const line = rng.pick(candidates);
    const color = board.grid[line.cells[0]];
    // Every other cell takes a different color; one cell keeps `color`, so it
    // is (tied for) the least common color in the line.
    const grid = board.grid.slice();
    for (const i of line.cells) grid[i] = (color + 1 + rng.int(board.colors - 1)) % board.colors;
    grid[rng.pick(line.cells)] = color;
    return { grid, target: { cells: line.cells, line: { kind: line.kind, index: line.index }, color } };
  },
  label(target, board) {
    return `${lineName(target.line)} → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- cross

function crossCells(size, center) {
  return [center].concat(neighbors(size, center)).sort((a, b) => a - b);
}

export const cross = {
  id: 'cross',
  name: 'Cross',
  text: 'A gem and its four neighbors become the color you choose.',
  isLuck: false,
  lockParam: 'color',
  targets(board, inst) {
    const out = [];
    const colors = colorChoices(board, inst);
    for (let i = 0; i < board.grid.length; i++) {
      const cells = crossCells(board.size, i);
      for (const color of colors) out.push({ cells, center: i, color });
    }
    return out;
  },
  apply(board, target) {
    return paintCells(board.grid, target.cells, target.color);
  },
  invert(board, rng, inst) {
    const candidates = [];
    for (let i = 0; i < board.grid.length; i++) {
      const cells = crossCells(board.size, i);
      const c = board.grid[i];
      if (cells.every((k) => board.grid[k] === c) && (inst == null || inst.lockedColor == null || inst.lockedColor === c)) candidates.push({ cells, center: i, color: c });
    }
    if (!candidates.length) return null;
    const target = rng.pick(candidates);
    return { grid: randomizeCells(board.grid, target.cells, rng, board.colors, target.color), target };
  },
  label(target, board) {
    return `Cross at ${rowOf(board.size, target.center) + 1},${colOf(board.size, target.center) + 1} → ${colorName(board, target.color)}`;
  },
};

// ---------------------------------------------------------------- purge

export const purge = {
  id: 'purge',
  name: 'Purge',
  text: 'Every gem of the rarest color becomes the most common color. You break ties.',
  isLuck: false,
  lockParam: null,
  targets(board) {
    const counts = colorCounts(board.grid, board.colors);
    const present = colorsPresent(board.grid, board.colors);
    if (present.length < 2) return [];
    const most = Math.max(...present.map((c) => counts[c]));
    const least = Math.min(...present.map((c) => counts[c]));
    const out = [];
    for (const from of present) {
      if (counts[from] !== least) continue;
      for (const to of present) {
        if (to === from || counts[to] !== most) continue;
        out.push({ cells: cellsOfColor(board.grid, from), color: from, color2: to });
      }
    }
    return out;
  },
  apply(board, target) {
    return transmute.apply(board, target);
  },
  invert(board, rng) {
    const counts = colorCounts(board.grid, board.colors);
    const present = colorsPresent(board.grid, board.colors);
    const absent = allColors(board).filter((c) => !present.includes(c));
    if (!absent.length) return null;
    // `to` must stay (tied for) most common after giving one cell away.
    const sorted = present.slice().sort((a, b) => counts[b] - counts[a]);
    const to = sorted[0];
    const second = sorted.length > 1 ? counts[sorted[1]] : 0;
    if (counts[to] - 1 < second || counts[to] < 2) return null;
    const from = rng.pick(absent);
    const grid = board.grid.slice();
    grid[rng.pick(cellsOfColor(board.grid, to))] = from;
    return { grid, target: { cells: cellsOfColor(grid, from), color: from, color2: to } };
  },
  label(target, board) {
    return `${colorName(board, target.color)} → ${colorName(board, target.color2)}`;
  },
};

// ---------------------------------------------------------------- luck cards

function otherPresentColors(grid, colors, except) {
  return colorsPresent(grid, colors).filter((c) => c !== except);
}

export const scatter = {
  id: 'scatter',
  name: 'Scatter',
  text: 'Up to three gems each become a random different color from the board.',
  isLuck: true,
  lockParam: null,
  targets(board) {
    const n = board.grid.length;
    const out = [];
    for (let a = 0; a < n; a++) {
      out.push({ cells: [a] });
      for (let b = a + 1; b < n; b++) {
        out.push({ cells: [a, b] });
        for (let c = b + 1; c < n; c++) out.push({ cells: [a, b, c] });
      }
    }
    return out;
  },
  // Solver-only pruning: scatter only cells that are not the majority color,
  // and cap the number of subsets considered.
  solverTargets(board, targets, cap = 24) {
    const counts = colorCounts(board.grid, board.colors);
    let major = 0;
    for (let c = 1; c < counts.length; c++) if (counts[c] > counts[major]) major = c;
    const minor = [];
    for (let i = 0; i < board.grid.length; i++) if (board.grid[i] !== major) minor.push(i);
    const out = [];
    for (let a = 0; a < minor.length && out.length < cap; a++) {
      out.push({ cells: [minor[a]] });
      for (let b = a + 1; b < minor.length && out.length < cap; b++) {
        out.push({ cells: [minor[a], minor[b]] });
        for (let c = b + 1; c < minor.length && out.length < cap; c++) out.push({ cells: [minor[a], minor[b], minor[c]] });
      }
    }
    return out;
  },
  apply(board, target, rng) {
    const out = board.grid.slice();
    for (const i of target.cells) {
      const options = otherPresentColors(board.grid, board.colors, board.grid[i]);
      if (options.length) out[i] = rng.pick(options);
    }
    return out;
  },
  label(target) {
    return `Scatter ${target.cells.length} gem${target.cells.length === 1 ? '' : 's'}`;
  },
};

export const wildTransmute = {
  id: 'wildTransmute',
  name: 'Wild Transmute',
  text: 'Every gem of one color becomes a random other color from the board.',
  isLuck: true,
  lockParam: null,
  targets(board) {
    const present = colorsPresent(board.grid, board.colors);
    if (present.length < 2) return [];
    return present.map((color) => ({ cells: cellsOfColor(board.grid, color), color }));
  },
  apply(board, target, rng) {
    const options = otherPresentColors(board.grid, board.colors, target.color);
    if (!options.length) return board.grid.slice();
    const to = rng.pick(options);
    return transmute.apply(board, { color: target.color, color2: to });
  },
  label(target, board) {
    return `${colorName(board, target.color)} → ?`;
  },
};

export const luckyLine = {
  id: 'luckyLine',
  name: 'Lucky Line',
  text: 'A random row or column becomes the color you choose.',
  isLuck: true,
  lockParam: 'color',
  targets(board, inst) {
    return colorChoices(board, inst).map((color) => ({ cells: [], color }));
  },
  apply(board, target, rng) {
    const line = rng.pick(lines(board.size));
    return paintCells(board.grid, line.cells, target.color);
  },
  label(target, board) {
    return `Random line → ${colorName(board, target.color)}`;
  },
};

export const tumble = {
  id: 'tumble',
  name: 'Tumble',
  text: 'The gems in a row or column are shuffled into a random order.',
  isLuck: true,
  lockParam: null,
  targets(board) {
    return lines(board.size).map((line) => ({ cells: line.cells, line: { kind: line.kind, index: line.index } }));
  },
  apply(board, target, rng) {
    const values = target.cells.map((i) => board.grid[i]);
    rng.shuffle(values);
    const out = board.grid.slice();
    target.cells.forEach((i, k) => { out[i] = values[k]; });
    return out;
  },
  label(target) {
    return `Tumble ${lineName(target.line).toLowerCase()}`;
  },
};

export const QUADRANT_NAMES = { tl: 'Top-left', tr: 'Top-right', bl: 'Bottom-left', br: 'Bottom-right' };

export function quadrantCells(size, which) {
  const q = Math.ceil(size / 2);
  const r0 = which === 'tl' || which === 'tr' ? 0 : size - q;
  const c0 = which === 'tl' || which === 'bl' ? 0 : size - q;
  const out = [];
  for (let r = r0; r < r0 + q; r++) for (let c = c0; c < c0 + q; c++) out.push(idx(size, r, c));
  return out;
}

export const quadrants = {
  id: 'quadrants',
  name: 'Quadrants',
  text: 'The gems in one corner quadrant are shuffled among themselves.',
  isLuck: true,
  lockParam: null,
  targets(board) {
    return Object.keys(QUADRANT_NAMES).map((which) => ({ cells: quadrantCells(board.size, which), quadrant: which }));
  },
  apply(board, target, rng) {
    const values = target.cells.map((i) => board.grid[i]);
    rng.shuffle(values);
    const out = board.grid.slice();
    target.cells.forEach((i, k) => { out[i] = values[k]; });
    return out;
  },
  label(target) {
    return `Shuffle ${QUADRANT_NAMES[target.quadrant].toLowerCase()}`;
  },
};

// ---------------------------------------------------------------- catalog

export const CARDS = {
  rowPaint, colPaint, diagPaint, transmute, colorSwap, flood, spread, stamp,
  majority, slide, trade, mirror, groupPaint, corners, rowMirror, colMirror,
  minority, cross, purge, scatter, wildTransmute, luckyLine, tumble, quadrants,
};

export const DETERMINISTIC_IDS = Object.values(CARDS).filter((c) => !c.isLuck).map((c) => c.id);
export const LUCK_IDS = Object.values(CARDS).filter((c) => c.isLuck).map((c) => c.id);

export function cardDef(type) {
  const def = CARDS[type];
  if (!def) throw new Error(`Unknown card type: ${type}`);
  return def;
}

// Display name for a card instance ("Ruby Row" style for locked cards).
export function instanceName(inst, colorNames) {
  const def = cardDef(inst.type);
  if (inst.lockedColor == null) return def.name;
  const color = colorNames ? colorNames[inst.lockedColor] : `Color ${inst.lockedColor + 1}`;
  return `${color} ${def.name}`;
}

export function isUniformBoard(board) {
  return isUniform(board.grid);
}

export { lineCells, idx };
