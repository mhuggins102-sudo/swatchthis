// Named configurations for the sweep. The three shipped tiers are imported
// from js/tiers.js; the rest are variations on them.
import { TIERS } from '../js/tiers.js';

const base = (t, over) => ({ ...t, ...over });

export const CONFIGS = {
  easy: TIERS.easy,
  medium: TIERS.medium,
  hard: TIERS.hard,
};

export function addConfig(name, tier) {
  CONFIGS[name] = { ...tier, id: name };
}

// --- sweep variations around medium
addConfig('med-k6', base(TIERS.medium, { k: 6 }));
addConfig('med-k8', base(TIERS.medium, { k: 8 }));
addConfig('med-hand9', base(TIERS.medium, { hand: 9 }));
addConfig('med-hand11', base(TIERS.medium, { hand: 11 }));
addConfig('med-t0', base(TIERS.medium, { maxTransmutes: 0 }));
addConfig('med-t2', base(TIERS.medium, { maxTransmutes: 2 }));
addConfig('med-lock0', base(TIERS.medium, { lockedRatio: 0 }));
addConfig('med-lock6', base(TIERS.medium, { lockedRatio: 0.6 }));
addConfig('med-luck0', base(TIERS.medium, { luck: [0, 0] }));
addConfig('med-luck2', base(TIERS.medium, { luck: [2, 2] }));
addConfig('med-6col', base(TIERS.medium, { colors: 6, minColorsPresent: 5 }));
addConfig('med-shortcut1', base(TIERS.medium, { greedyShortcut: 1 }));
addConfig('med-nosetup', base(TIERS.medium, { cardWeights: { slide: 0, trade: 0, colorSwap: 0, mirror: 0.3 } }));
addConfig('med-lowpaint', base(TIERS.medium, { cardWeights: { rowPaint: 0.5, colPaint: 0.5, diagPaint: 0.4, transmute: 0.4 } }));
addConfig('med-share40', base(TIERS.medium, { maxShareStart: 0.4 }));
addConfig('med-k9', base(TIERS.medium, { k: 9, luck: [1, 1] }));
addConfig('med-k8-hand10-luck1', base(TIERS.medium, { k: 8, luck: [1, 1] }));
addConfig('med-tight', base(TIERS.medium, { k: 8, luck: [1, 1], maxShareStart: 0.4, maxTransmutes: 0 }));
addConfig('med-gap2', base(TIERS.medium, { maxSolverShortcut: 2 }));
addConfig('med-gap1', base(TIERS.medium, { maxSolverShortcut: 1 }));
addConfig('med-gap2-luck1', base(TIERS.medium, { maxSolverShortcut: 2, luck: [1, 1] }));
addConfig('easy-gap2', base(TIERS.easy, { maxSolverShortcut: 2 }));
addConfig('hard-gap2', base(TIERS.hard, { maxSolverShortcut: 2 }));
addConfig('hard-gap3', base(TIERS.hard, { maxSolverShortcut: 3 }));
addConfig('med-A', base(TIERS.medium, { k: 8, luck: [1, 1], maxSolverShortcut: 2 }));
addConfig('med-B', base(TIERS.medium, { k: 8, luck: [1, 1], maxSolverShortcut: 3 }));
addConfig('med-C', base(TIERS.medium, { k: 9, luck: [1, 1], maxSolverShortcut: 3 }));
addConfig('med-D', base(TIERS.medium, { k: 8, luck: [1, 2], maxSolverShortcut: 2, maxTransmutes: 0 }));
addConfig('med-E', base(TIERS.medium, { k: 8, luck: [1, 1], maxSolverShortcut: 2, lockedRatio: 0.5 }));
addConfig('hard-A', base(TIERS.hard, { k: 9, luck: [2, 2], maxSolverShortcut: 3 }));
addConfig('hard-B', base(TIERS.hard, { k: 9, luck: [1, 1], maxSolverShortcut: 3 }));
