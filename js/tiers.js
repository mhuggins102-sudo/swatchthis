// Difficulty tiers, tuned by the sim sweep (sim/run.js); the tables behind
// each choice are in TUNING.md. Knobs:
//   size, colors, hand        grid side, palette size, cards dealt
//   k                         constructed solution length
//   luck [min, max]           luck cards per hand
//   maxTransmutes             cap on Transmute cards per hand (always < colors - 1)
//   lockedRatio               chance a color card is printed with a fixed color
//   minColorsPresent          reject start boards showing fewer colors
//   maxShareStart             reject start boards where one color exceeds this share
//   greedyShortcut            reject if Greedy wins in fewer than k - greedyShortcut cards
//   maxSolverShortcut         reject if the solver's shortest win is more than this many cards under k
//   cardWeights, luckWeights  deal weights per card type (defaults below)

export const DEFAULT_CARD_WEIGHTS = {
  rowPaint: 1, colPaint: 1, diagPaint: 0.8, transmute: 0.7, colorSwap: 0.6, flood: 1,
  spread: 1, stamp: 0.9, majority: 1, slide: 0.6, trade: 0.6, mirror: 0.6,
};

export const DEFAULT_LUCK_WEIGHTS = { scatter: 1, wildTransmute: 1, luckyLine: 1, tumble: 1 };

export const TIERS = {
  easy: {
    id: 'easy', name: 'Easy', size: 5, colors: 4, hand: 10, k: 5, luck: [1, 1],
    maxTransmutes: 1, lockedRatio: 0.3, minColorsPresent: 3, maxShareStart: 0.5,
    greedyShortcut: 0, maxSolverShortcut: 2,
  },
  medium: {
    id: 'medium', name: 'Medium', size: 5, colors: 5, hand: 10, k: 8, luck: [1, 1],
    maxTransmutes: 1, lockedRatio: 0.3, minColorsPresent: 4, maxShareStart: 0.5,
    greedyShortcut: 0, maxSolverShortcut: 3,
  },
  hard: {
    id: 'hard', name: 'Hard', size: 6, colors: 6, hand: 11, k: 9, luck: [1, 1],
    maxTransmutes: 2, lockedRatio: 0.35, minColorsPresent: 5, maxShareStart: 0.5,
    greedyShortcut: 0, maxSolverShortcut: 3,
  },
};

export const TIER_ORDER = ['easy', 'medium', 'hard'];

export const COLOR_NAMES = ['Ruby', 'Sapphire', 'Emerald', 'Topaz', 'Amethyst', 'Opal'];
