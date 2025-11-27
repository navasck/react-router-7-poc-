// @ts-nocheck
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('rr7-pwa-cache').then((cache) => {
      return cache.addAll(['/manifest.webmanifest']);
    })
  );
});

self.addEventListener('activate', (event) => {
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  // NEVER touch POST or form submissions
  if (event.request.method !== 'GET') return;

  // NEVER intercept SSR navigations
  if (event.request.mode === 'navigate') return;

  // Allow static asset caching only
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          return caches.open('rr7-pwa-cache').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

