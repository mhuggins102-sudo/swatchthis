// Seeded PRNG (mulberry32). Every source of randomness in the game goes
// through an Rng instance so any board can be reproduced from its seed.

export function hashSeed(input) {
  // Turn a string or number into a 32-bit seed (FNV-1a over the string form).
  const s = String(input);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export class Rng {
  constructor(seed) {
    this.seed = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
    this.state = this.seed;
  }

  // Uniform float in [0, 1).
  next() {
    let t = (this.state += 0x6d2b79f5) >>> 0;
    this.state = t;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Integer in [0, n).
  int(n) {
    return Math.floor(this.next() * n);
  }

  // Integer in [lo, hi] inclusive.
  range(lo, hi) {
    return lo + this.int(hi - lo + 1);
  }

  chance(p) {
    return this.next() < p;
  }

  pick(arr) {
    if (arr.length === 0) return undefined;
    return arr[this.int(arr.length)];
  }

  // Weighted pick: items is an array of [value, weight].
  weighted(items) {
    let total = 0;
    for (const [, w] of items) total += w;
    let r = this.next() * total;
    for (const [v, w] of items) {
      r -= w;
      if (r < 0) return v;
    }
    return items[items.length - 1][0];
  }

  // In-place Fisher-Yates shuffle; returns the same array.
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.int(i + 1);
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  // A new independent stream derived from this one.
  fork(label = '') {
    return new Rng(hashSeed(`${this.int(0x7fffffff)}:${label}`));
  }
}

export function makeRng(seed) {
  return new Rng(seed);
}
