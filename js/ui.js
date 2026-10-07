// Browser UI: rendering, input, storage. Grey-box build: plain colored
// shapes, no animation polish yet. All rules go through js/engine.js.

import {
  startSession, playInSession, undoInSession, canUndo, restartSession, legalTargets,
  previewGrid, isNoop, isWin, isLoss, sessionStars, largestShareOf, newState, applyMove,
} from './engine.js';
import { cardDef, instanceName, slideLabel, QUADRANT_NAMES } from './cards.js';
import { TIERS, TIER_ORDER, COLOR_NAMES } from './tiers.js';
import { getPuzzle, puzzleFromSeed } from './puzzles.js';
import { rowOf, colOf } from './grid.js';

// ------------------------------------------------------------------ storage

const STATS_KEY = 'gemgrid.stats.v1';
const CURRENT_KEY = 'gemgrid.current.v1';
const SETTINGS_KEY = 'gemgrid.settings.v1';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

const stats = load(STATS_KEY, {});
const settings = { sound: false, haptics: true, colorsOnly: false, ...load(SETTINGS_KEY, {}) };

function tierStats(id) {
  if (!stats[id]) stats[id] = { plays: 0, wins: 0, bestStars: 0 };
  return stats[id];
}

// ------------------------------------------------------------------ app state

const app = {
  screen: 'start',
  tierId: 'medium',
  session: null,
  source: null,
  sel: emptySel(),
  mode: 'play',        // 'play' | 'solution'
  solutionStep: 0,
  solutionState: null,
  resultShown: false,
};

function emptySel() {
  return { card: null, cells: [], color: null, color2: null, cellsKey: null, option: null };
}

const $ = (id) => document.getElementById(id);
const el = {
  start: $('screen-start'), game: $('screen-game'), tiers: $('tier-list'),
  grid: $('grid'), strip: $('strip'), hand: $('hand'), overlay: $('overlay'), toast: $('toast'),
  hdrTier: $('hdr-tier'), hdrCards: $('hdr-cards'), hdrPar: $('hdr-par'),
};

// ------------------------------------------------------------------ helpers

const CARD_ICONS = {
  rowPaint: '▬', colPaint: '▮', diagPaint: '◢', transmute: '⇒', colorSwap: '⇄', flood: '◉',
  spread: '✺', stamp: '▦', majority: '⚖', slide: '⇢', trade: '⤲', mirror: '◧',
  groupPaint: '⁘', corners: '⌜⌟', rowMirror: '↔', colMirror: '↕', minority: '⚖', cross: '✚', purge: '⌫',
  scatter: '⁂', wildTransmute: '⇝', luckyLine: '⚄', tumble: '⟳', quadrants: '⊞',
};

function gemSvg(color) {
  if (settings.colorsOnly) return `<span class="swatch bg-${color}"></span>`;
  return `<svg class="gem"><use href="#gem-${color}" class="fill-${color}"/></svg>`;
}

// Par shown as cards played (the solver's shortest win); internally par is
// the leftover count.
function parCards(session) {
  return session.puzzle.hand.length - session.puzzle.par;
}

function cellsKey(cells) {
  return cells.slice().sort((a, b) => a - b).join(',');
}

function boardOf(state) {
  return { size: state.size, colors: state.colors, grid: state.grid, colorNames: COLOR_NAMES };
}

function cellName(size, i) {
  return `${rowOf(size, i) + 1},${colOf(size, i) + 1}`;
}

// Label for the cell-set part of a target (without colors or directions).
function cellsLabel(target, state) {
  const size = state.size;
  if (target.line) {
    if (target.line.kind === 'row') return `Row ${target.line.index + 1}`;
    if (target.line.kind === 'col') return `Column ${target.line.index + 1}`;
    return `Diagonal ${target.line.kind === 'down' ? '↘' : '↗'} (${target.cells.length})`;
  }
  if (target.axis) return { left: 'Left half', right: 'Right half', top: 'Top half', bottom: 'Bottom half' }[target.side];
  if (target.groupSize) return `All groups of ${target.groupSize}`;
  if (target.quadrant) return `${QUADRANT_NAMES[target.quadrant]} quadrant`;
  if (target.cellsA) return `Group of ${target.cellsA.length} + group of ${target.cellsB.length}`;
  if (target.center != null) return `Cross at ${cellName(size, target.center)}`;
  if (target.cells.length === 4 && app.sel.card != null && app.session.state.hand[app.sel.card].type === 'corners') return 'Corners';
  if (target.cells.length === 4 && app.sel.card != null && app.session.state.hand[app.sel.card].type === 'stamp') {
    return `Block at ${cellName(size, target.cells[0])}`;
  }
  if (target.cells.length === 0) return 'Any';
  if (target.cells.length <= 3) return target.cells.map((c) => cellName(size, c)).join(' + ');
  return `Group of ${target.cells.length}`;
}

function optionLabel(target) {
  if (target.shift) return slideLabel(target.line, target.shift, app.session.state.size);
  return cardDef(app.session.state.hand[app.sel.card].type).label(target, boardOf(app.session.state));
}

function vibrate(ms) {
  if (settings.haptics && navigator.vibrate) {
    try { navigator.vibrate(ms); } catch { /* ignore */ }
  }
}

let toastTimer = null;
function toast(msg, ms = 1800) {
  el.toast.textContent = msg;
  el.toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.add('hidden'), ms);
}

// ------------------------------------------------------------------ target resolution
// Given the selected card and what the player has tapped so far, work out
// which targets remain, which cells are legal to tap, and what still needs
// choosing (a cell set, a color, a second color, a direction/side).

function resolve() {
  const state = app.session.state;
  const sel = app.sel;
  if (sel.card == null || !state.hand[sel.card]) return null;
  const inst = state.hand[sel.card];
  const def = cardDef(inst.type);
  const all = legalTargets(state, sel.card);
  const selected = sel.cells;
  let cands = all.filter((t) => selected.every((c) => t.cells.includes(c)));
  if (sel.cellsKey != null) cands = cands.filter((t) => cellsKey(t.cells) === sel.cellsKey);
  if (sel.color != null) cands = cands.filter((t) => t.color === sel.color);
  if (sel.color2 != null) cands = cands.filter((t) => t.color2 === sel.color2);
  if (sel.option != null) cands = cands.filter((t) => optionLabel(t) === sel.option);

  const legalCells = new Set();
  for (const t of cands) for (const c of t.cells) legalCells.add(c);

  // Distinct cell sets among the candidates.
  const setMap = new Map();
  for (const t of cands) {
    const k = cellsKey(t.cells);
    if (!setMap.has(k)) setMap.set(k, { key: k, cells: t.cells, label: cellsLabel(t, state) });
  }
  const cellSets = [...setMap.values()];
  const selKey = cellsKey(selected);
  const exact = cellSets.find((s) => s.key === selKey);
  let resolvedKey = null;
  if (cellSets.length === 1) resolvedKey = cellSets[0].key;
  else if (exact) resolvedKey = exact.key;
  const noCells = all.length && all.every((t) => t.cells.length === 0);
  if (noCells) resolvedKey = '';

  let narrowed = resolvedKey == null ? [] : cands.filter((t) => cellsKey(t.cells) === resolvedKey);
  const colorOptions = distinct(narrowed.map((t) => t.color));
  const color2Options = distinct(narrowed.map((t) => t.color2));
  const needColor = colorOptions.length > 1;
  const needColor2 = !needColor && color2Options.length > 1;
  let options = [];
  let target = null;
  if (narrowed.length === 1) target = narrowed[0];
  else if (!needColor && !needColor2 && narrowed.length > 1) options = narrowed.map((t) => ({ label: optionLabel(t), target: t }));

  return {
    inst, def, all, cands, legalCells, cellSets, resolvedKey, exact: !!exact,
    needCellSetChoice: resolvedKey == null && cellSets.length > 1 && cellSets.length <= 6 && selected.length > 0,
    colorOptions: needColor ? colorOptions : [], color2Options: needColor2 ? color2Options : [],
    options, target, noCells,
  };
}

function distinct(values) {
  const out = [];
  for (const v of values) if (v != null && !out.includes(v)) out.push(v);
  return out;
}

// ------------------------------------------------------------------ rendering

function render() {
  el.start.classList.toggle('hidden', app.screen !== 'start');
  el.game.classList.toggle('hidden', app.screen !== 'game');
  if (app.screen === 'start') renderStart();
  else renderGame();
}

function renderStart() {
  el.tiers.innerHTML = '';
  for (const id of TIER_ORDER) {
    const t = TIERS[id];
    const s = tierStats(id);
    const btn = document.createElement('button');
    btn.className = 'tier-btn';
    btn.innerHTML = `<span class="name">${t.name}</span><span class="meta">${t.size}×${t.size}, ${t.colors} colors<br>${s.wins} win${s.wins === 1 ? '' : 's'} of ${s.plays} · best ${'★'.repeat(s.bestStars) || '–'}</span>`;
    btn.addEventListener('click', () => newGame(id));
    el.tiers.appendChild(btn);
  }
  if (!document.getElementById('seed-row')) {
    const row = document.createElement('div');
    row.className = 'seed-row';
    row.id = 'seed-row';
    row.innerHTML = `<input id="seed-input" placeholder="Seed (optional, for debugging)" aria-label="Seed"><button id="seed-go">Play seed</button>`;
    el.tiers.parentNode.insertBefore(row, el.tiers.nextSibling);
    row.querySelector('#seed-go').addEventListener('click', () => {
      const v = row.querySelector('#seed-input').value.trim();
      if (v) newGame(app.tierId, v);
    });
  }
}

function renderGame() {
  const session = app.session;
  const state = app.mode === 'solution' ? app.solutionState : session.state;
  const tier = TIERS[app.tierId];
  const res = app.mode === 'play' ? resolve() : null;
  const won = isWin(state);

  el.hdrTier.textContent = tier.name + (app.mode === 'solution' ? ' · solution' : '');
  const played = session.puzzle.hand.length - state.hand.length;
  el.hdrCards.textContent = `${played} played`;
  el.hdrPar.textContent = `Par ${parCards(session)}`;

  renderGrid(state, res, won);
  renderStrip(state, res, won);
  renderHand(state, res);
}

function renderGrid(state, res, won) {
  const size = state.size;
  el.grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  let preview = null;
  let changed = new Set();
  let risk = new Set();
  if (res && res.target) {
    if (!res.def.isLuck) {
      preview = previewGrid(state, app.sel.card, res.target);
      for (let i = 0; i < preview.length; i++) if (preview[i] !== state.grid[i]) changed.add(i);
    } else {
      const t = res.target;
      if (res.inst.type === 'luckyLine') for (let i = 0; i < state.grid.length; i++) risk.add(i);
      else for (const c of t.cells) risk.add(c);
    }
  }
  if (el.grid.childElementCount !== size * size) {
    el.grid.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
      const b = document.createElement('button');
      b.className = 'cell';
      b.dataset.i = i;
      b.setAttribute('role', 'gridcell');
      b.addEventListener('click', () => onCellTap(i));
      el.grid.appendChild(b);
    }
  }
  const selecting = res != null && !res.noCells;
  for (let i = 0; i < size * size; i++) {
    const b = el.grid.children[i];
    const color = preview ? preview[i] : state.grid[i];
    const html = gemSvg(color);
    if (b.dataset.html !== html) { b.innerHTML = html; b.dataset.html = html; }
    b.setAttribute('aria-label', `Cell ${cellName(size, i)}: ${COLOR_NAMES[state.grid[i]]}`);
    b.classList.toggle('legal', selecting && res.legalCells.has(i) && !app.sel.cells.includes(i));
    b.classList.toggle('dim', selecting && !res.legalCells.has(i) && !app.sel.cells.includes(i));
    b.classList.toggle('selected', selecting && app.sel.cells.includes(i));
    b.classList.toggle('ghost', changed.has(i));
    b.classList.toggle('risk', risk.has(i));
    b.classList.toggle('won', won);
  }
}

function renderStrip(state, res, won) {
  const session = app.session;
  const s = el.strip;
  s.innerHTML = '';
  const add = (html, cls = 'strip-text') => {
    const d = document.createElement('div');
    d.className = cls;
    d.innerHTML = html;
    s.appendChild(d);
    return d;
  };

  if (app.mode === 'solution') {
    const sol = session.puzzle.solution;
    const step = app.solutionStep;
    add(`Stored solution: step ${Math.min(step, sol.length)} of ${sol.length}`, 'strip-title');
    if (step < sol.length) {
      const move = sol[step];
      const inst = session.puzzle.hand.find((c) => c.uid === move.uid);
      add(`Next: <b>${instanceName(inst, COLOR_NAMES)}</b> — ${cardDef(inst.type).label(move.target, boardOf(state))}`);
    } else add('Grid is uniform. That is one line; the solver may know shorter ones.');
    const row = add('', 'strip-actions');
    row.innerHTML = `<button id="sol-next" class="primary" ${step >= sol.length ? 'disabled' : ''}>Next step</button><button id="sol-done">Done</button>`;
    row.querySelector('#sol-next').addEventListener('click', solutionNext);
    row.querySelector('#sol-done').addEventListener('click', () => { app.mode = 'play'; showResult(); render(); });
    return;
  }

  if (won) {
    add('Solved!', 'strip-title');
    add(`${'★'.repeat(sessionStars(session))} in ${session.puzzle.hand.length - state.hand.length} cards (par ${parCards(session)}).`);
  } else if (isLoss(state)) {
    add('Out of cards', 'strip-title');
    add(`Largest color reached ${Math.round(largestShareOf(state) * 100)}%.`);
  } else if (!res) {
    add('Pick a card', 'strip-title');
    add('Tap a card below. Legal targets light up on the grid. Long-press a card for its full rule.');
  } else {
    add(instanceName(res.inst, COLOR_NAMES), 'strip-title');
    add(res.def.text);
    if (res.all.length === 0) add('No legal target for this card right now.', 'strip-text warn');
    else if (res.needCellSetChoice) {
      add('Which one?');
      const row = add('', 'strip-row');
      for (const set of res.cellSets) {
        const b = document.createElement('button');
        b.className = 'pick';
        b.textContent = set.label;
        b.addEventListener('click', () => { app.sel.cellsKey = set.key; render(); });
        row.appendChild(b);
      }
    } else if (res.resolvedKey == null && !res.noCells) {
      add(res.inst.type === 'scatter' || res.inst.type === 'trade' ? 'Tap the cells.' : 'Tap a target on the grid.');
    }
    if (res.colorOptions.length) {
      add('Choose a color');
      const row = add('', 'strip-row');
      for (const c of res.colorOptions) row.appendChild(colorPick(c, 'color'));
    } else if (res.color2Options.length) {
      add(res.inst.type === 'colorSwap' ? 'Swap with' : 'Turn into');
      const row = add('', 'strip-row');
      for (const c of res.color2Options) row.appendChild(colorPick(c, 'color2'));
    } else if (res.options.length) {
      const row = add('', 'strip-row');
      for (const o of res.options) {
        const b = document.createElement('button');
        b.className = 'pick';
        b.textContent = o.label;
        b.addEventListener('click', () => { app.sel.option = o.label; render(); });
        row.appendChild(b);
      }
    }
    if (res.target && !res.def.isLuck && isNoop(state, app.sel.card, res.target)) add('This play changes nothing.', 'strip-text warn');
    if (res.target && res.def.isLuck) add('Luck card: no preview, and no undo past this point.', 'strip-text warn');
  }

  const row = add('', 'strip-actions');
  const undoDisabled = app.mode !== 'play' || !canUndo(session) ? 'disabled' : '';
  const confirmDisabled = res && res.target && !won ? '' : 'disabled';
  row.innerHTML = `<button id="btn-undo" ${undoDisabled}>Undo</button>` +
    (res ? `<button id="btn-cancel">Cancel</button>` : '') +
    `<button id="btn-confirm" class="primary" ${confirmDisabled}>Confirm</button>`;
  row.querySelector('#btn-undo').addEventListener('click', onUndo);
  row.querySelector('#btn-confirm').addEventListener('click', onConfirm);
  const cancel = row.querySelector('#btn-cancel');
  if (cancel) cancel.addEventListener('click', () => { app.sel = emptySel(); render(); });
}

function colorPick(c, key) {
  const b = document.createElement('button');
  b.className = 'pick';
  b.innerHTML = `${gemSvg(c)}<span>${COLOR_NAMES[c]}</span>`;
  b.setAttribute('aria-label', COLOR_NAMES[c]);
  b.addEventListener('click', () => { app.sel[key] = c; render(); });
  return b;
}

function renderHand(state, res) {
  const session = app.session;
  const original = session.puzzle.hand;
  el.hand.style.gridTemplateColumns = `repeat(${Math.ceil(original.length / 2)}, 1fr)`;
  el.hand.innerHTML = '';
  original.forEach((inst) => {
    const idx = state.hand.findIndex((c) => c.uid === inst.uid);
    const played = idx < 0;
    const def = cardDef(inst.type);
    const b = document.createElement('button');
    b.className = 'card' + (def.isLuck ? ' luck' : '') + (played ? ' played' : '');
    if (!played && app.mode === 'play' && legalTargets(state, idx).length === 0) b.classList.add('unplayable');
    if (!played && app.sel.card === idx) b.classList.add('selected');
    const lock = inst.lockedColor != null ? gemSvg(inst.lockedColor) : '';
    b.innerHTML = `<span class="icon">${CARD_ICONS[inst.type] || '?'}${lock}</span><span class="name">${def.name}</span>`;
    b.setAttribute('aria-label', instanceName(inst, COLOR_NAMES) + (played ? ' (played)' : ''));
    if (!played && app.mode === 'play') {
      b.addEventListener('click', () => onCardTap(idx));
      attachLongPress(b, () => toast(`${instanceName(inst, COLOR_NAMES)}: ${def.text}`, 3500));
    }
    el.hand.appendChild(b);
  });
}

function attachLongPress(node, fn) {
  let timer = null;
  const start = () => { timer = setTimeout(() => { timer = null; fn(); }, 500); };
  const cancel = () => { if (timer) clearTimeout(timer); timer = null; };
  node.addEventListener('pointerdown', start);
  node.addEventListener('pointerup', cancel);
  node.addEventListener('pointerleave', cancel);
  node.addEventListener('pointercancel', cancel);
  node.addEventListener('contextmenu', (e) => e.preventDefault());
}

// ------------------------------------------------------------------ input

function onCardTap(idx) {
  if (app.mode !== 'play' || isWin(app.session.state)) return;
  if (app.sel.card === idx) app.sel = emptySel();
  else {
    app.sel = emptySel();
    app.sel.card = idx;
    if (legalTargets(app.session.state, idx).length === 0) toast('No legal target for this card right now.');
  }
  vibrate(8);
  render();
}

function onCellTap(i) {
  if (app.mode !== 'play') return;
  const res = resolve();
  if (!res) return;
  const sel = app.sel;
  if (sel.cells.includes(i)) {
    sel.cells = sel.cells.filter((c) => c !== i);
    sel.cellsKey = null; sel.option = null;
  } else if (!res.legalCells.has(i)) {
    // Tapping elsewhere cancels the current targeting but keeps the card.
    const card = sel.card;
    app.sel = emptySel();
    app.sel.card = card;
    const fresh = resolve();
    if (fresh && fresh.legalCells.has(i)) app.sel.cells = [i];
  } else {
    sel.cells = sel.cells.concat([i]);
    sel.cellsKey = null; sel.option = null;
  }
  vibrate(8);
  render();
}

function onConfirm() {
  const res = resolve();
  if (!res || !res.target) return;
  app.session = playInSession(app.session, app.sel.card, res.target);
  app.sel = emptySel();
  vibrate(res.def.isLuck ? 30 : 12);
  render();
  if (isWin(app.session.state) || isLoss(app.session.state)) {
    finishGame();
  }
  persistCurrent();
}

function onUndo() {
  if (!canUndo(app.session)) return;
  app.session = undoInSession(app.session);
  app.sel = emptySel();
  render();
}

function onRestart() {
  if (!app.session) return;
  app.session = restartSession(app.session);
  app.sel = emptySel();
  app.mode = 'play';
  app.resultShown = false;
  hideOverlay();
  render();
}

// ------------------------------------------------------------------ game flow

function newGame(tierId, seed = null) {
  app.tierId = tierId;
  let puzzle;
  try {
    const r = getPuzzle(tierId, { seed });
    puzzle = r.puzzle;
    app.source = r.source;
  } catch (e) {
    console.error(e);
    toast('Could not build a puzzle: ' + e.message, 4000);
    return;
  }
  app.session = startSession(puzzle);
  app.sel = emptySel();
  app.mode = 'play';
  app.resultShown = false;
  app.screen = 'game';
  tierStats(tierId).plays++;
  save(STATS_KEY, stats);
  persistCurrent();
  hideOverlay();
  render();
}

function persistCurrent() {
  if (!app.session) return;
  save(CURRENT_KEY, { tierId: app.tierId, seed: app.session.puzzle.seed });
}

function finishGame() {
  const state = app.session.state;
  const s = tierStats(app.tierId);
  if (isWin(state)) {
    s.wins++;
    s.bestStars = Math.max(s.bestStars, sessionStars(app.session));
    save(STATS_KEY, stats);
  }
  setTimeout(showResult, 350);
}

function showResult() {
  const state = app.session.state;
  if (isWin(state)) {
    const stars = sessionStars(app.session);
    showOverlay(`
      <h2>Solved</h2>
      <div class="stars">${[1, 2, 3].map((n) => `<span class="${n <= stars ? '' : 'off'}">★</span>`).join('')}</div>
      <p>Solved in ${app.session.puzzle.hand.length - state.hand.length} cards. Par ${parCards(app.session)}.</p>
      <button id="ov-next" class="primary">Next puzzle</button>
      <div class="row"><button id="ov-replay">Replay this board</button><button id="ov-home">Change tier</button></div>`);
    $('ov-next').addEventListener('click', () => newGame(app.tierId));
    $('ov-replay').addEventListener('click', onRestart);
    $('ov-home').addEventListener('click', goHome);
  } else if (isLoss(state)) {
    showOverlay(`
      <h2>Out of cards</h2>
      <p>Largest color reached ${Math.round(largestShareOf(state) * 100)}% of the grid.</p>
      <button id="ov-retry" class="primary">Retry</button>
      <div class="row"><button id="ov-solution">Show a solution</button><button id="ov-next">New puzzle</button></div>
      <button id="ov-home" class="small">Change tier</button>`);
    $('ov-retry').addEventListener('click', onRestart);
    $('ov-solution').addEventListener('click', startSolution);
    $('ov-next').addEventListener('click', () => newGame(app.tierId));
    $('ov-home').addEventListener('click', goHome);
  }
}

function startSolution() {
  hideOverlay();
  app.mode = 'solution';
  app.solutionStep = 0;
  app.solutionState = newState(app.session.puzzle);
  app.sel = emptySel();
  render();
}

function solutionNext() {
  const sol = app.session.puzzle.solution;
  if (app.solutionStep >= sol.length) return;
  const move = sol[app.solutionStep];
  const state = app.solutionState;
  const i = state.hand.findIndex((c) => c.uid === move.uid);
  app.solutionState = applyMove(state, i, move.target);
  app.solutionStep++;
  render();
}

function goHome() {
  hideOverlay();
  app.screen = 'start';
  app.mode = 'play';
  render();
}

function showOverlay(html) {
  el.overlay.innerHTML = `<div class="dialog">${html}</div>`;
  el.overlay.classList.remove('hidden');
}
function hideOverlay() {
  el.overlay.classList.add('hidden');
  el.overlay.innerHTML = '';
}

function showMenu() {
  const p = app.session ? app.session.puzzle : null;
  showOverlay(`
    <h2>Settings</h2>
    <label>Sound (not yet in this build) <input type="checkbox" id="set-sound" ${settings.sound ? 'checked' : ''}></label>
    <label>Haptics <input type="checkbox" id="set-haptics" ${settings.haptics ? 'checked' : ''}></label>
    <label>Colors only (no shapes) <input type="checkbox" id="set-colors" ${settings.colorsOnly ? 'checked' : ''}></label>
    ${p ? `<p class="seed">Puzzle ${p.seed} · source ${app.source} · built from ${p.k} cards, par ${parCards(app.session)}</p>` : ''}
    <div class="row"><button id="menu-new">New puzzle</button><button id="menu-home">Change tier</button></div>
    <button id="menu-close" class="primary">Close</button>`);
  $('set-sound').addEventListener('change', (e) => { settings.sound = e.target.checked; save(SETTINGS_KEY, settings); });
  $('set-haptics').addEventListener('change', (e) => { settings.haptics = e.target.checked; save(SETTINGS_KEY, settings); });
  $('set-colors').addEventListener('change', (e) => { settings.colorsOnly = e.target.checked; save(SETTINGS_KEY, settings); document.body.classList.toggle('colors-only', settings.colorsOnly); render(); });
  $('menu-new').addEventListener('click', () => newGame(app.tierId));
  $('menu-home').addEventListener('click', goHome);
  $('menu-close').addEventListener('click', hideOverlay);
}

// ------------------------------------------------------------------ boot

$('btn-home').addEventListener('click', goHome);
$('btn-restart').addEventListener('click', onRestart);
$('btn-menu').addEventListener('click', showMenu);
el.overlay.addEventListener('click', (e) => { if (e.target === el.overlay && app.mode === 'play' && app.session && !isWin(app.session.state) && !isLoss(app.session.state)) hideOverlay(); });

// Debug handle (used by the browser smoke tests).
window.gemgrid = { app, newGame, resolve };

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

(function boot() {
  document.body.classList.toggle('colors-only', settings.colorsOnly);
  const current = load(CURRENT_KEY, null);
  if (current && current.tierId && TIERS[current.tierId] && current.seed) {
    try {
      const puzzle = puzzleFromSeed(current.tierId, current.seed);
      app.tierId = current.tierId;
      app.session = startSession(puzzle);
      app.source = String(current.seed).startsWith('pack:') ? 'pack' : 'device';
      app.screen = 'game';
    } catch (e) {
      console.warn('Could not restore the last puzzle', e);
    }
  }
  render();
})();
