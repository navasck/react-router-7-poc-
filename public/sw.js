// @ts-nocheck
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('rr7-pwa-cache').then((cache) => {
      return cache.addAll(['/', '/manifest.webmanifest']);
    })
  );
});

self.addEventListener('activate', (event) => {
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).catch(() => {
          // fallback for navigation
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        })
      );
    })
  );
});
