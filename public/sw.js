const CACHE_NAME = 'ankara-usta-bul-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

const IMAGE_CACHE = 'images-v1';
const API_CACHE = 'api-v1';

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== IMAGE_CACHE && cacheName !== API_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets
    if (STATIC_ASSETS.includes(url.pathname)) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            return response || fetch(request);
          })
      );
    }
    
    // Images
    else if (request.destination === 'image') {
      event.respondWith(
        caches.open(IMAGE_CACHE)
          .then((cache) => {
            return cache.match(request)
              .then((response) => {
                if (response) {
                  return response;
                }
                return fetch(request)
                  .then((networkResponse) => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                  });
              });
          })
      );
    }
    
    // API requests
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(
        caches.open(API_CACHE)
          .then((cache) => {
            return cache.match(request)
              .then((response) => {
                if (response) {
                  // Return cached response and update in background
                  fetch(request)
                    .then((networkResponse) => {
                      cache.put(request, networkResponse);
                    })
                    .catch(() => {});
                  return response;
                }
                return fetch(request)
                  .then((networkResponse) => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                  });
              });
          })
      );
    }
    
    // Other requests
    else {
      event.respondWith(
        caches.open(DYNAMIC_CACHE)
          .then((cache) => {
            return cache.match(request)
              .then((response) => {
                return response || fetch(request)
                  .then((networkResponse) => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                  });
              });
          })
      );
    }
  }
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Yeni bildirim',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Görüntüle',
        icon: '/favicon.ico'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/favicon.ico'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Ankara Usta Bul', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
function doBackgroundSync() {
  return new Promise((resolve) => {
    // Perform background sync operations
    console.log('Background sync completed');
    resolve();
  });
}

// Cache size management
function trimCache(cacheName, maxItems) {
  caches.open(cacheName)
    .then((cache) => {
      return cache.keys()
        .then((keys) => {
          if (keys.length > maxItems) {
            cache.delete(keys[0])
              .then(() => trimCache(cacheName, maxItems));
          }
        });
    });
}

// Periodic cache cleanup
setInterval(() => {
  trimCache(DYNAMIC_CACHE, 50);
  trimCache(IMAGE_CACHE, 100);
  trimCache(API_CACHE, 20);
}, 1000 * 60 * 60); // Every hour 