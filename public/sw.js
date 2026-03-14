const CACHE_NAME = 'spice-garden-v1';

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/logo.png',
];

// Install: pre-cache critical assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and same-origin / CDN requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache valid responses from the same origin
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(event.request, cloned)
            );
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: return root page if navigating
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});
