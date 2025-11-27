// @ts-nocheck

const CACHE_NAME = 'rr7-pwa-cache-v2';
const STATIC_ASSETS = [
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  clients.claim();
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // ⭐ VERY IMPORTANT: NEVER CACHE HTML or SSR navigation
  if (req.mode === 'navigate') {
    return; // allow Cloudflare SSR to run normally
  }

  // ⭐ Cache only static assets (CSS, JS, images, icons)
  const url = new URL(req.url);
  const isStatic =
    req.destination === 'script' ||
    req.destination === 'style' ||
    req.destination === 'image' ||
    req.destination === 'font';

  if (isStatic) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            // save to cache
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
            return res;
          })
      )
    );
  }
});
