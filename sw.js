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

const CACHE_NAME = 'ShopeePicks-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/SP192.png',
  '/SP512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Skip Shopee affiliate links
  if (event.request.url.includes('s.shopee.ph')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
