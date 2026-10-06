# Gem Grid (working title)

A portrait-mode phone puzzle: turn a grid of gems into a single color using a
fixed hand of action cards. Vanilla HTML, CSS and ES modules; no framework, no
build step, no dependencies, deployable to Netlify as static files.

## Play locally

```
npm run serve        # http://localhost:8080/
```

Any static server works (`python3 -m http.server`), as long as `.js` files
are served as JavaScript modules.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | Shell and inline SVG gem definitions |
| `css/style.css` | Layout, theme, animations |
| `js/engine.js` | State, legal moves, apply, win check, undo stack (pure, DOM-free) |
| `js/cards.js` | Card catalog as data plus `targets` / `apply` / `invert` |
| `js/grid.js` | Grid helpers shared by everything |
| `js/rng.js` | Seeded PRNG (mulberry32) |
| `js/generator.js` | Backward construction, quality checks, verification |
| `js/solver.js` | Beam-search solver (verification and par) and the greedy baseline |
| `js/tiers.js` | Difficulty tiers and tuning knobs |
| `js/puzzles.js` | Puzzle source for the browser (seed pack, on-device fallback) |
| `js/ui.js` | Rendering, input, storage |
| `sw.js` | Service worker: app shell precache so the game plays offline (bump `VERSION` on every release) |
| `data/seedpack.js` | Verified seeds per tier, written by the final `sim/run.js --pack` run |
| `sim/bots.js`, `sim/run.js` | Bots and the sweep harness (Node only) |
| `test/` | Unit and property tests, `npm test` |
| `TUNING.md` | Sim results and chosen configurations |

## Commands

```
npm test                                  # node --test
node sim/run.js --n 2000                  # play the three tiers with the bots
node sim/run.js --all --n 400             # every sweep configuration in sim/configs.js
node sim/run.js --config medium --bots random,greedy,lookahead,solver,solverEv --lines
node sim/run.js --n 2000 --pack           # the final run; also rebuilds data/seedpack.js from its puzzles
```

The seed pack must be rebuilt whenever `js/tiers.js`, `js/generator.js`,
`js/cards.js` or `js/rng.js` change, because the browser rebuilds each puzzle
from its seed and trusts the par stored in the pack. `npm test` checks a sample
of the pack against the solver.

## Debugging

The settings menu in the game shows the current puzzle's seed. The start
screen accepts a seed, which runs the full generator and solver on the device.
`window.gemgrid` exposes the app state in the browser console.
