/**
 * Service Worker for Phoebe Little Adventures
 * Enables offline reading and improves performance through caching
 * 
 * Features:
 * - App shell caching (HTML, CSS, JS)
 * - Image caching on-demand
 * - Offline fallback pages
 * - Cache versioning
 */

const CACHE_NAME = 'phoebe-v1';
const OFFLINE_PAGE = '/offline.html';

const urlsToCache = [
    '/',
    '/index.html',
    '/books.html',
    '/story.html',
    '/favorites.html',
    '/404.html',
    '/offline.html',
    '/css/style.css',
    '/js/storage.js',
    '/js/story-data.js',
    '/js/story.js',
    '/js/books.js',
    '/images/phoebe.png',
    '/images/mama.png',
    '/images/papa.png',
];

/**
 * Install event - Cache app shell
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching app shell');
            return cache.addAll(urlsToCache).catch((error) => {
                console.warn('Service Worker: Some assets failed to cache', error);
                // Continue even if some assets fail
                return urlsToCache
                    .filter(url => !url.includes('images/'))
                    .reduce((promise, url) => {
                        return promise.then(() => cache.add(url).catch(() => {}));
                    }, Promise.resolve());
            });
        })
    );
    self.skipWaiting();
});

/**
 * Activate event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

/**
 * Fetch event - Network first, then cache, then offline
 */
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Handle image requests - cache first
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then((response) => {
                return (
                    response ||
                    fetch(request)
                        .then((response) => {
                            // Cache images on-demand
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, responseToCache);
                            });

                            return response;
                        })
                        .catch(() => {
                            // Return placeholder for missing images
                            return caches.match('/images/placeholder.png') ||
                                new Response(
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
                                    '<rect fill="#ddd" width="100" height="100"/>' +
                                    '<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-size="12">Image not found</text>' +
                                    '</svg>',
                                    { headers: { 'Content-Type': 'image/svg+xml' } }
                                );
                        })
                );
            })
        );
        return;
    }

    // Handle HTML requests - network first, fallback to cache
    if (request.destination === '' || request.destination === 'document') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful HTML responses
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });

                    return response;
                })
                .catch(() => {
                    // Fall back to cache
                    return caches.match(request).then((response) => {
                        if (response) {
                            return response;
                        }

                        // Return offline page
                        return caches.match(OFFLINE_PAGE) ||
                            new Response(
                                '<!DOCTYPE html><html><body><h1>Offline</h1><p>Unable to load page. Please check your connection.</p></body></html>',
                                { headers: { 'Content-Type': 'text/html' } }
                            );
                    });
                })
        );
        return;
    }

    // Default: Cache first, then network
    event.respondWith(
        caches.match(request).then((response) => {
            return (
                response ||
                fetch(request)
                    .then((response) => {
                        // Only cache successful responses
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });

                        return response;
                    })
                    .catch(() => {
                        // Return cached version if available
                        return caches.match(request);
                    })
            );
        })
    );
});

/**
 * Message event - Handle messages from clients
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            event.ports[0].postMessage({ success: true });
        });
    }
});
