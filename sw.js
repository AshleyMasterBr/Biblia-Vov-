// sw.js - Versão 2 (Pra forçar atualização)
const CACHE_NAME = 'biblia-vovo-v2'; // Mudei de v1 para v2

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o novo SW a assumir imediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './logo.png' // Adicionei o logo.png aqui explicitamente
      ]);
    })
  );
});

self.addEventListener('activate', (e) => {
  // Limpa o cache antigo (v1) pra não sobrar lixo
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)) // Tenta internet primeiro, se falhar usa cache
  );
});
