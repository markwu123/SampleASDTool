const CACHE_NAME = 'asd-comm-tool-v1';
const urlsToCache = [
  '/',                    // 根目錄
  '/index.html',
  '/css/style.css',
  '/js/index.js',
  '/data.json',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// 安裝階段：快取基本檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // 讓新 SW 立即接管
});

// 啟動階段：清除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim(); // 立即生效
});

// 讀取快取或網路內容
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
