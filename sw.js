
const CACHE = 'micajalite-mw8fn264';
const ARCHIVOS = ["./","./assets/index-DK_yeVSn.js","./assets/exceljs.min-CPgc8yxt.js","./assets/index-DhIdb47X.css","./assets/outfit-latin-500-normal-ClnHRwRh.woff","./assets/outfit-latin-500-normal-DKnIMDSk.woff2","./assets/outfit-latin-700-normal-Cu9v6i1X.woff2","./assets/outfit-latin-700-normal-D4itBLBr.woff","./assets/outfit-latin-900-normal-D7VxKg29.woff2","./assets/outfit-latin-900-normal-DBTzQ72N.woff","./assets/outfit-latin-ext-500-normal-DrCvqoFD.woff","./assets/outfit-latin-ext-500-normal-zeox_O30.woff2","./assets/outfit-latin-ext-700-normal-CI4iH74K.woff2","./assets/outfit-latin-ext-700-normal-fjS8-Gm7.woff","./assets/outfit-latin-ext-900-normal-D2Agn9b_.woff2","./assets/outfit-latin-ext-900-normal-P1LUQYP8.woff","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon.svg"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('micajalite-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./').then((r) => r || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req).then((r) => r || fetch(req)));
});
