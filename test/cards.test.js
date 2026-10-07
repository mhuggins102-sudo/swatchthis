import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARDS, cardDef, DETERMINISTIC_IDS, LUCK_IDS } from '../js/cards.js';
import { Rng } from '../js/rng.js';
import { uniformGrid, gridsEqual, colorsPresent, idx } from '../js/grid.js';

function board(rows, colors = 4) {
  // rows: array of strings of digits, e.g. ['0120', ...]
  const size = rows.length;
  const grid = [];
  for (const r of rows) for (const ch of r) grid.push(Number(ch));
  return { size, colors, grid };
}

function rows(size, grid) {
  const out = [];
  for (let r = 0; r < size; r++) out.push(grid.slice(r * size, (r + 1) * size).join(''));
  return out;
}

const B = board(['0120', '1120', '3302', '2001']);

test('Row Paint paints a whole row', () => {
  const t = CARDS.rowPaint.targets(B).find((x) => x.line.index === 2 && x.color === 1);
  assert.deepEqual(rows(4, CARDS.rowPaint.apply(B, t)), ['0120', '1120', '1111', '2001']);
});

test('Column Paint paints a whole column', () => {
  const t = CARDS.colPaint.targets(B).find((x) => x.line.index === 0 && x.color === 3);
  assert.deepEqual(rows(4, CARDS.colPaint.apply(B, t)), ['3120', '3120', '3302', '3001']);
});

test('Diagonal Paint paints diagonals of 3 or more only', () => {
  const ts = CARDS.diagPaint.targets(B);
  assert.ok(ts.every((t) => t.cells.length >= 3));
  const main = ts.find((t) => t.cells.length === 4 && t.cells[0] === 0 && t.color === 2);
  assert.deepEqual(rows(4, CARDS.diagPaint.apply(B, main)), ['2120', '1220', '3322', '2002']);
});

test('Transmute recolors every cell of one color', () => {
  const t = CARDS.transmute.targets(B).find((x) => x.color === 0 && x.color2 === 2);
  assert.deepEqual(rows(4, CARDS.transmute.apply(B, t)), ['2122', '1122', '3322', '2221']);
  assert.ok(!CARDS.transmute.targets(B).some((x) => x.color === x.color2));
});

test('Color Swap trades the colors of two groups only', () => {
  // group of 1s at (0,1),(1,0),(1,1) and the group of 3s at (2,0),(2,1)
  const t = CARDS.colorSwap.targets(B).find((x) => x.cellsA.includes(1) && x.cellsB.includes(8));
  assert.deepEqual(rows(4, CARDS.colorSwap.apply(B, t)), ['0320', '3320', '1102', '2001']);
  assert.ok(!CARDS.colorSwap.targets(B).some((x) => B.grid[x.cellsA[0]] === B.grid[x.cellsB[0]]));
});

test('Flood recolors a connected group only', () => {
  // group of 1s at (0,1),(1,0),(1,1)
  const t = CARDS.flood.targets(B).find((x) => x.cells.includes(1) && x.color === 3);
  assert.deepEqual(t.cells, [1, 4, 5]);
  assert.deepEqual(rows(4, CARDS.flood.apply(B, t)), ['0320', '3320', '3302', '2001']);
});

test('Spread recolors the cells touching a group', () => {
  const t = CARDS.spread.targets(B).find((x) => x.cells.includes(1));
  assert.deepEqual(rows(4, CARDS.spread.apply(B, t)), ['1110', '1110', '1102', '2001']);
});

test('Stamp recolors a 2x2 block', () => {
  const t = CARDS.stamp.targets(B).find((x) => x.cells[0] === idx(4, 2, 2) && x.color === 0);
  assert.deepEqual(rows(4, CARDS.stamp.apply(B, t)), ['0120', '1120', '3300', '2000']);
});

test('Majority Rule offers only the most common colors and paints the line', () => {
  const ts = CARDS.majority.targets(B).filter((x) => x.line.kind === 'row' && x.line.index === 1);
  assert.deepEqual(ts.map((t) => t.color), [1]);
  assert.deepEqual(rows(4, CARDS.majority.apply(B, ts[0])), ['0120', '1111', '3302', '2001']);
  // row 0 is 0,1,2,0 -> 0 wins; row 3 is 2,0,0,1 -> 0 wins; column 3 is 0,0,2,1 -> 0
  const tie = CARDS.majority.targets(board(['01', '23'])).filter((x) => x.line.kind === 'row' && x.line.index === 0);
  assert.deepEqual(tie.map((t) => t.color).sort(), [0, 1]);
});

test('Slide shifts a line by any number of cells with wraparound', () => {
  const right1 = CARDS.slide.targets(B).find((x) => x.line.kind === 'row' && x.line.index === 0 && x.shift === 1);
  assert.deepEqual(rows(4, CARDS.slide.apply(B, right1)), ['0012', '1120', '3302', '2001']);
  const right2 = CARDS.slide.targets(B).find((x) => x.line.kind === 'row' && x.line.index === 0 && x.shift === 2);
  assert.deepEqual(rows(4, CARDS.slide.apply(B, right2)), ['2001', '1120', '3302', '2001']);
  const up1 = CARDS.slide.targets(B).find((x) => x.line.kind === 'col' && x.line.index === 0 && x.shift === 3);
  assert.deepEqual(rows(4, CARDS.slide.apply(B, up1)), ['1120', '3120', '2302', '0001']);
  assert.equal(CARDS.slide.targets(B).filter((x) => x.line.kind === 'row' && x.line.index === 0).length, 3);
});

test('Trade swaps two cells of different colors', () => {
  const t = CARDS.trade.targets(B).find((x) => x.cells[0] === 0 && x.cells[1] === 1);
  assert.deepEqual(rows(4, CARDS.trade.apply(B, t)), ['1020', '1120', '3302', '2001']);
  assert.ok(!CARDS.trade.targets(B).some((x) => B.grid[x.cells[0]] === B.grid[x.cells[1]]));
});

test('Mirror copies one half onto the other, reflected', () => {
  const t = CARDS.mirror.targets(B).find((x) => x.axis === 'v' && x.side === 'right');
  assert.deepEqual(rows(4, CARDS.mirror.apply(B, t)), ['0110', '1111', '3333', '2002']);
  const b = CARDS.mirror.targets(B).find((x) => x.axis === 'h' && x.side === 'bottom');
  assert.deepEqual(rows(4, CARDS.mirror.apply(B, b)), ['0120', '1120', '1120', '0120']);
  // odd size leaves the middle line alone
  const O = board(['012', '345', '012'], 6);
  const l = CARDS.mirror.targets(O).find((x) => x.axis === 'v' && x.side === 'left');
  assert.deepEqual(rows(3, CARDS.mirror.apply(O, l)), ['212', '545', '212']);
});

test('Luck cards only produce colors already on the board', () => {
  const rng = new Rng(7);
  const present = colorsPresent(B.grid, B.colors);
  for (let k = 0; k < 50; k++) {
    for (const id of LUCK_IDS) {
      const def = CARDS[id];
      const ts = def.targets(B);
      const t = rng.pick(ts);
      const g = def.apply(B, t, rng);
      for (const c of g) assert.ok(present.includes(c), `${id} introduced color ${c}`);
    }
  }
});

test('Scatter changes each chosen cell to a different color', () => {
  const rng = new Rng(3);
  const t = { cells: [0, 5, 10] };
  for (let k = 0; k < 20; k++) {
    const g = CARDS.scatter.apply(B, t, rng);
    for (const i of t.cells) assert.notEqual(g[i], B.grid[i]);
    for (let i = 0; i < 16; i++) if (!t.cells.includes(i)) assert.equal(g[i], B.grid[i]);
  }
});

test('Tumble keeps the same multiset in the line', () => {
  const rng = new Rng(5);
  const t = CARDS.tumble.targets(B).find((x) => x.line.kind === 'col' && x.line.index === 3);
  const g = CARDS.tumble.apply(B, t, rng);
  assert.deepEqual(t.cells.map((i) => g[i]).sort(), t.cells.map((i) => B.grid[i]).sort());
});

test('Locked cards only offer their color, and stay playable when it has left the board', () => {
  const inst = { uid: 'x', type: 'rowPaint', lockedColor: 3 };
  assert.ok(CARDS.rowPaint.targets(B, inst).every((t) => t.color === 3));
  const noThree = board(['0120', '1120', '0002', '2001']);
  assert.equal(CARDS.rowPaint.targets(noThree, inst).length, 4);
  // Wild cards may choose any palette color, present or not.
  assert.equal(CARDS.rowPaint.targets(noThree).length, 16);
  const tr = { uid: 'y', type: 'transmute', lockedColor: 2 };
  assert.ok(CARDS.transmute.targets(B, tr).every((t) => t.color2 === 2));
});

test('Spread only targets groups of at most 8 cells', () => {
  const big = board(['0000', '0000', '0001', '2222']);
  assert.ok(!CARDS.spread.targets(big).some((t) => t.cells.length > 8));
  assert.ok(CARDS.spread.targets(big).some((t) => t.cells.length === 4));
});

test('Group Paint recolors every group of the chosen size', () => {
  // groups: 0s {0,3?}.. use explicit board: 1s group of 3 at (0,1),(1,0),(1,1); 3s group of 2; 2s group of 2 at (0,2),(1,2)
  // groups of 3 on B: the 1s at (0,1),(1,0),(1,1) and the 0s at (2,2),(3,1),(3,2)
  const t = CARDS.groupPaint.targets(B).find((x) => x.groupSize === 3 && x.color === 2);
  assert.deepEqual(t.cells, [1, 4, 5, 10, 13, 14]);
  assert.deepEqual(rows(4, CARDS.groupPaint.apply(B, t)), ['0220', '2220', '3322', '2221']);
  assert.ok(!CARDS.groupPaint.targets(B).some((x) => x.groupSize === 5));
});

test('Corners recolors the four corners', () => {
  const t = CARDS.corners.targets(B).find((x) => x.color === 3);
  assert.deepEqual(rows(4, CARDS.corners.apply(B, t)), ['3123', '1120', '3302', '3003']);
});

test('Row Mirror and Column Mirror reverse one line', () => {
  const r = CARDS.rowMirror.targets(B).find((x) => x.line.index === 0);
  assert.deepEqual(rows(4, CARDS.rowMirror.apply(B, r)), ['0210', '1120', '3302', '2001']);
  const c = CARDS.colMirror.targets(B).find((x) => x.line.index === 3);
  assert.deepEqual(rows(4, CARDS.colMirror.apply(B, c)), ['0121', '1122', '3300', '2000']);
});

test('Minority Rule offers only the least common colors and paints the line', () => {
  // row 0 = 0,1,2,0: least common are 1 and 2
  const ts = CARDS.minority.targets(B).filter((x) => x.line.kind === 'row' && x.line.index === 0);
  assert.deepEqual(ts.map((t) => t.color).sort(), [1, 2]);
  assert.deepEqual(rows(4, CARDS.minority.apply(B, ts.find((t) => t.color === 2))), ['2222', '1120', '3302', '2001']);
});

test('Cross recolors a cell and its neighbors, clipped at the edge', () => {
  const t = CARDS.cross.targets(B).find((x) => x.center === 5 && x.color === 3);
  assert.deepEqual(rows(4, CARDS.cross.apply(B, t)), ['0320', '3330', '3302', '2001']);
  const corner = CARDS.cross.targets(B).find((x) => x.center === 0 && x.color === 3);
  assert.deepEqual(corner.cells, [0, 1, 4]);
});

test('Purge turns the rarest color into the most common one', () => {
  // counts on B: 0 x5, 1 x4, 2 x4, 3 x3 -> rarest 3, most common 0
  const ts = CARDS.purge.targets(B);
  assert.equal(ts.length, 1);
  assert.deepEqual(rows(4, CARDS.purge.apply(B, ts[0])), ['0120', '1120', '0002', '2001']);
});

test('Quadrants shuffles the cells of one corner block only', () => {
  const rng = new Rng(9);
  const t = CARDS.quadrants.targets(B).find((x) => x.quadrant === 'br');
  assert.deepEqual(t.cells, [10, 11, 14, 15]);
  const g = CARDS.quadrants.apply(B, t, rng);
  assert.deepEqual(t.cells.map((i) => g[i]).sort(), t.cells.map((i) => B.grid[i]).sort());
  for (let i = 0; i < 16; i++) if (!t.cells.includes(i)) assert.equal(g[i], B.grid[i]);
});

test('Every target in targets() is accepted by apply without throwing', () => {
  const rng = new Rng(11);
  for (const id of Object.keys(CARDS)) {
    const def = CARDS[id];
    for (const t of def.targets(B)) {
      const g = def.apply(B, t, rng);
      assert.equal(g.length, 16);
    }
  }
});

test('apply after invert restores the original board, for every deterministic card', () => {
  const rng = new Rng(2024);
  const checks = {};
  for (let trial = 0; trial < 400; trial++) {
    const size = 4 + rng.int(3);
    const colors = 3 + rng.int(4);
    // Mix uniform boards (what the generator starts from) and random boards
    // with symmetric or uniform features so every inverse gets exercised.
    let grid;
    const mode = rng.int(4);
    if (mode === 0) grid = uniformGrid(size, rng.int(colors));
    else if (mode === 1) {
      grid = uniformGrid(size, rng.int(colors));
      for (let k = 0; k < size; k++) grid[rng.int(grid.length)] = rng.int(colors);
    } else if (mode === 2) {
      grid = [];
      for (let i = 0; i < size * size; i++) grid.push(rng.int(colors));
      // make it vertically symmetric
      for (let r = 0; r < size; r++) for (let c = 0; c < Math.floor(size / 2); c++) grid[idx(size, r, size - 1 - c)] = grid[idx(size, r, c)];
    } else {
      grid = [];
      for (let i = 0; i < size * size; i++) grid.push(rng.int(colors));
    }
    const b = { size, colors, grid };
    for (const id of DETERMINISTIC_IDS) {
      const def = cardDef(id);
      const inv = def.invert(b, rng);
      if (!inv) continue;
      checks[id] = (checks[id] || 0) + 1;
      const pred = { size, colors, grid: inv.grid };
      // The recorded target must be among the legal targets on the predecessor.
      const legal = def.targets(pred).some((t) => JSON.stringify(t) === JSON.stringify(inv.target));
      assert.ok(legal, `${id}: inverse target is not a legal target on the predecessor`);
      const restored = def.apply(pred, inv.target);
      assert.ok(gridsEqual(restored, grid), `${id}: apply(invert) did not restore\n${rows(size, grid)}\n${rows(size, inv.grid)}\n${rows(size, restored)}`);
      assert.ok(!gridsEqual(inv.grid, grid), `${id}: inverse produced a no-op`);
    }
  }
  for (const id of DETERMINISTIC_IDS) assert.ok(checks[id] > 20, `${id} inverse was exercised only ${checks[id] || 0} times`);
});
