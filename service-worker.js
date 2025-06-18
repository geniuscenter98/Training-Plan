const CACHE_NAME = 'training-plan-cache-v1';
const urlsToCache = [
    '',  Cache the root path if your index is at root
    'كاليستنكس.html',
    'manifest.json',
     إذا كان لديك ملفات CSS أو JS خارجية، أضف روابطها هنا
     'httpscdnjs.cloudflare.comajaxlibsjspdf2.5.1jspdf.umd.min.js',
     'httpscdnjs.cloudflare.comajaxlibshtml2canvas1.4.1html2canvas.min.js',
     أي صور أو فيديوهات ثابتة تريد تخزينها مؤقتاً
     'iconsicon-72x72.png',
     'iconsicon-96x96.png',
     ...etc for all icons
];

self.addEventListener('install', (event) = {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) = {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) = {
    event.respondWith(
        caches.match(event.request)
            .then((response) = {
                 Cache hit - return response
                if (response) {
                    return response;
                }
                 If not in cache, fetch from network
                return fetch(event.request).catch(() = {
                     If network fails and it's a navigation request, serve offline page (optional)
                     For now, if fetch fails, the request will just fail
                });
            })
    );
});

self.addEventListener('activate', (event) = {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) = {
            return Promise.all(
                cacheNames.map((cacheName) = {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});