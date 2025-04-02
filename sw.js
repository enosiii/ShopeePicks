// const CACHE_NAME = 'ShopeePicks-v1';
// const ASSETS_TO_CACHE = [
//   '/ShopeePicks/',
//   '/ShopeePicks/index.html',
//   '/ShopeePicks/SP192.png',
//   '/ShopeePicks/SP512.png'
// ];

// // Install the service worker and cache assets
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => cache.addAll(ASSETS_TO_CACHE))
//       .then(() => self.skipWaiting())
//   );
// });

// // Activate the service worker and clean up old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     }).then(() => self.clients.claim())
//   );
// });

// // Serve cached assets when offline
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => response || fetch(event.request))
//   );
// });


const CACHE_NAME = 'ShopeePicks-v2'; // Increment version number for updates
const ASSETS_TO_CACHE = [
  '/ShopeePicks/',
  '/ShopeePicks/index.html',
  '/ShopeePicks/SP192.png',
  '/ShopeePicks/SP512.png'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated and old caches deleted.');
      return self.clients.claim();
    })
  );
});

// Serve cached assets when offline, or fetch from network if not cached
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Otherwise, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Cache the fetched response for future offline use
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request.url, networkResponse.clone()); // Clone for caching
          return networkResponse;
        });
      });
    })
  );
});
