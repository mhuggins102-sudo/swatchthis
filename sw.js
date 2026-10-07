// Service worker: precache the app shell so the game loads and plays offline
// after the first visit, with no network requests during play. Bump VERSION
// whenever any shipped file changes so clients pick up the new build.
const VERSION = 'gemgrid-v2';
const SHELL = [
  './', './index.html', './css/style.css',
  './js/ui.js', './js/engine.js', './js/cards.js', './js/grid.js', './js/rng.js',
  './js/generator.js', './js/solver.js', './js/tiers.js', './js/puzzles.js',
  './data/seedpack.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

// Network first (so deploys show up), cache fallback (so offline works).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true })),
  );
});
