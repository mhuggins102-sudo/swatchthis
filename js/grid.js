// Pure grid helpers shared by the engine, the cards, the generator, the
// solver and the UI. A board is { size, colors, grid } where grid is a flat
// array of color indexes (row-major) and colors is the palette size.

export function idx(size, r, c) {
  return r * size + c;
}

export function rowOf(size, i) {
  return Math.floor(i / size);
}

export function colOf(size, i) {
  return i % size;
}

export function rowCells(size, r) {
  const out = [];
  for (let c = 0; c < size; c++) out.push(idx(size, r, c));
  return out;
}

export function colCells(size, c) {
  const out = [];
  for (let r = 0; r < size; r++) out.push(idx(size, r, c));
  return out;
}

// All rows and columns as { kind, index, cells }.
export function lines(size) {
  const out = [];
  for (let r = 0; r < size; r++) out.push({ kind: 'row', index: r, cells: rowCells(size, r) });
  for (let c = 0; c < size; c++) out.push({ kind: 'col', index: c, cells: colCells(size, c) });
  return out;
}

export function lineCells(size, line) {
  return line.kind === 'row' ? rowCells(size, line.index) : colCells(size, line.index);
}

// Every diagonal (both orientations) with at least minLen cells.
// kind 'down' runs top-left to bottom-right, 'up' runs bottom-left to top-right.
export function diagonals(size, minLen = 3) {
  const out = [];
  let index = 0;
  for (let s = -(size - 1); s <= size - 1; s++) {
    // down diagonals: c - r = s
    const cells = [];
    for (let r = 0; r < size; r++) {
      const c = r + s;
      if (c >= 0 && c < size) cells.push(idx(size, r, c));
    }
    if (cells.length >= minLen) out.push({ kind: 'down', index: index++, offset: s, cells });
  }
  for (let s = 0; s <= 2 * (size - 1); s++) {
    // up diagonals: r + c = s
    const cells = [];
    for (let r = size - 1; r >= 0; r--) {
      const c = s - r;
      if (c >= 0 && c < size) cells.push(idx(size, r, c));
    }
    if (cells.length >= minLen) out.push({ kind: 'up', index: index++, offset: s, cells });
  }
  return out;
}

export function neighbors(size, i) {
  const r = rowOf(size, i);
  const c = colOf(size, i);
  const out = [];
  if (r > 0) out.push(i - size);
  if (r < size - 1) out.push(i + size);
  if (c > 0) out.push(i - 1);
  if (c < size - 1) out.push(i + 1);
  return out;
}

export function isUniform(grid) {
  const c0 = grid[0];
  for (let i = 1; i < grid.length; i++) if (grid[i] !== c0) return false;
  return true;
}

export function colorCounts(grid, colors) {
  const counts = new Array(colors).fill(0);
  for (const c of grid) counts[c]++;
  return counts;
}

export function colorsPresent(grid, colors) {
  const seen = new Array(colors).fill(false);
  for (const c of grid) seen[c] = true;
  const out = [];
  for (let c = 0; c < colors; c++) if (seen[c]) out.push(c);
  return out;
}

export function largestShare(grid, colors) {
  const counts = colorCounts(grid, colors);
  let best = 0;
  for (const n of counts) if (n > best) best = n;
  return best / grid.length;
}

export function majorityColor(grid, colors) {
  const counts = colorCounts(grid, colors);
  let best = 0;
  for (let c = 1; c < colors; c++) if (counts[c] > counts[best]) best = c;
  return best;
}

// The orthogonally connected same-color group containing cell i.
export function groupOf(grid, size, i) {
  const color = grid[i];
  const seen = new Uint8Array(grid.length);
  const stack = [i];
  seen[i] = 1;
  const out = [];
  while (stack.length) {
    const cur = stack.pop();
    out.push(cur);
    const r = (cur / size) | 0;
    const c = cur - r * size;
    if (r > 0 && !seen[cur - size] && grid[cur - size] === color) { seen[cur - size] = 1; stack.push(cur - size); }
    if (r < size - 1 && !seen[cur + size] && grid[cur + size] === color) { seen[cur + size] = 1; stack.push(cur + size); }
    if (c > 0 && !seen[cur - 1] && grid[cur - 1] === color) { seen[cur - 1] = 1; stack.push(cur - 1); }
    if (c < size - 1 && !seen[cur + 1] && grid[cur + 1] === color) { seen[cur + 1] = 1; stack.push(cur + 1); }
  }
  out.sort((a, b) => a - b);
  return out;
}

// All groups on the board as arrays of sorted cell indexes. The result is
// cached on the board object when one is passed (boards are never mutated).
export function allGroups(grid, size) {
  const seen = new Uint8Array(grid.length);
  const out = [];
  const stack = [];
  for (let i = 0; i < grid.length; i++) {
    if (seen[i]) continue;
    const color = grid[i];
    const g = [];
    stack.push(i);
    seen[i] = 1;
    while (stack.length) {
      const cur = stack.pop();
      g.push(cur);
      const r = (cur / size) | 0;
      const c = cur - r * size;
      if (r > 0 && !seen[cur - size] && grid[cur - size] === color) { seen[cur - size] = 1; stack.push(cur - size); }
      if (r < size - 1 && !seen[cur + size] && grid[cur + size] === color) { seen[cur + size] = 1; stack.push(cur + size); }
      if (c > 0 && !seen[cur - 1] && grid[cur - 1] === color) { seen[cur - 1] = 1; stack.push(cur - 1); }
      if (c < size - 1 && !seen[cur + 1] && grid[cur + 1] === color) { seen[cur + 1] = 1; stack.push(cur + 1); }
    }
    g.sort((a, b) => a - b);
    out.push(g);
  }
  return out;
}

// Groups of a board object, cached on the object.
export function groupsOf(board) {
  if (!board._groups) board._groups = allGroups(board.grid, board.size);
  return board._groups;
}

export function countGroups(grid, size) {
  const seen = new Uint8Array(grid.length);
  const stack = [];
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    if (seen[i]) continue;
    count++;
    const color = grid[i];
    stack.push(i);
    seen[i] = 1;
    while (stack.length) {
      const cur = stack.pop();
      const r = (cur / size) | 0;
      const c = cur - r * size;
      if (r > 0 && !seen[cur - size] && grid[cur - size] === color) { seen[cur - size] = 1; stack.push(cur - size); }
      if (r < size - 1 && !seen[cur + size] && grid[cur + size] === color) { seen[cur + size] = 1; stack.push(cur + size); }
      if (c > 0 && !seen[cur - 1] && grid[cur - 1] === color) { seen[cur - 1] = 1; stack.push(cur - 1); }
      if (c < size - 1 && !seen[cur + 1] && grid[cur + 1] === color) { seen[cur + 1] = 1; stack.push(cur + 1); }
    }
  }
  return count;
}

// Cells orthogonally adjacent to any cell in `cells` but not in it.
export function fringe(size, cells) {
  const inSet = new Set(cells);
  const out = new Set();
  for (const c of cells) for (const n of neighbors(size, c)) if (!inSet.has(n)) out.add(n);
  return [...out].sort((a, b) => a - b);
}

export function gridsEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export function gridKey(grid) {
  // Compact string key for hashing states.
  return String.fromCharCode.apply(null, grid);
}

export function cloneGrid(grid) {
  return grid.slice();
}

export function uniformGrid(size, color) {
  return new Array(size * size).fill(color);
}

export function halfCells(size, axis, side) {
  // axis 'v': left/right halves; axis 'h': top/bottom halves. The middle
  // line of an odd-sized board belongs to neither half.
  const out = [];
  const half = Math.floor(size / 2);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const pos = axis === 'v' ? c : r;
      if (side === 'left' || side === 'top') {
        if (pos < half) out.push(idx(size, r, c));
      } else if (pos >= size - half) out.push(idx(size, r, c));
    }
  }
  return out;
}

// The cell that mirrors cell i across the axis.
export function mirrorCell(size, axis, i) {
  const r = rowOf(size, i);
  const c = colOf(size, i);
  return axis === 'v' ? idx(size, r, size - 1 - c) : idx(size, size - 1 - r, c);
}

export function blocks2x2(size) {
  const out = [];
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      out.push([idx(size, r, c), idx(size, r, c + 1), idx(size, r + 1, c), idx(size, r + 1, c + 1)]);
    }
  }
  return out;
}

// Random connected subset of `cells` (which must itself be connected),
// of a random size between 1 and cells.length (inclusive).
export function randomConnectedSubset(size, cells, rng, maxSize = cells.length) {
  const allowed = new Set(cells);
  const want = rng.range(1, Math.max(1, Math.min(maxSize, cells.length)));
  const start = rng.pick(cells);
  const chosen = new Set([start]);
  let frontier = neighbors(size, start).filter((n) => allowed.has(n));
  while (chosen.size < want && frontier.length) {
    const pickIdx = rng.int(frontier.length);
    const next = frontier[pickIdx];
    frontier.splice(pickIdx, 1);
    if (chosen.has(next)) continue;
    chosen.add(next);
    for (const n of neighbors(size, next)) if (allowed.has(n) && !chosen.has(n)) frontier.push(n);
  }
  return [...chosen].sort((a, b) => a - b);
}
