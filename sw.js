// sw.js - O Fiscal que permite a instalação
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('biblia-vovo-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        // Se você tiver o ícone, coloque aqui tbm: './icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
