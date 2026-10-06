import { generatePuzzle } from '../js/generator.js';
import { TIERS } from '../js/tiers.js';
for (const id of ['easy', 'medium', 'hard']) {
  const tier = TIERS[id];
  const n = 20;
  let total = 0, attempts = 0, max = 0;
  const rej = {};
  for (let i = 0; i < n; i++) {
    const r = generatePuzzle(tier, `bench-${i}`);
    total += r.ms; attempts += r.attempts; max = Math.max(max, r.ms);
    for (const k in r.rejections) rej[k] = (rej[k] || 0) + r.rejections[k];
  }
  console.log(id, `avg ${(total / n).toFixed(0)} ms, max ${max.toFixed(0)} ms, attempts/puzzle ${(attempts / n).toFixed(1)}`, rej);
}
