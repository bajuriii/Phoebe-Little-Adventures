/**
 * Service Worker Registration & Management
 * Handles Service Worker lifecycle and updates
 */

if ('serviceWorker' in navigator) {
    /**
     * Register Service Worker on page load
     */
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/js/sw.js', { scope: '/' })
            .then((registration) => {
                console.log('✓ Service Worker registered:', registration);

                /**
                 * Check for updates every minute
                 * This ensures users get new content when available
                 */
                setInterval(() => {
                    registration.update();
                }, 60000);

                /**
                 * Listen for updates
                 */
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;

                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker is ready
                        console.log('New Service Worker version available');
                        notifyUpdateAvailable(newWorker);
                    }
                });
            })
            .catch((error) => {
                console.warn('Service Worker registration failed:', error);
            });
    });

    /**
     * Listen for controller change (when new SW takes over)
     */
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            console.log('Service Worker updated, reloading...');
            window.location.reload();
        }
    });

    /**
     * Show notification when update is available
     * @param {ServiceWorker} worker - The new service worker
     */
    function notifyUpdateAvailable(worker) {
        // Send message to new worker
        worker.postMessage({ type: 'SKIP_WAITING' });

        // Show subtle notification (optional)
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #FFD66B;
            color: #4A4A4A;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            font-family: Nunito, sans-serif;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = '✨ New version available! Refreshing...';
        document.body.appendChild(notification);
    }

    /**
     * Utility: Clear all caches (for debugging)
     * Usage: clearServiceWorkerCache()
     */
    window.clearServiceWorkerCache = function () {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        console.log('Clearing cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            });
        }
    };

    /**
     * Utility: Check Service Worker status
     * Usage: getServiceWorkerStatus()
     */
    window.getServiceWorkerStatus = function () {
        return {
            supported: true,
            registered: navigator.serviceWorker.controller ? true : false,
            controller: navigator.serviceWorker.controller?.state || 'none'
        };
    };
} else {
    console.info('Service Workers not supported in this browser');
}
