/* Service worker sencillo: hace que Chrome permita instalar la plataforma como app.
   Siempre intenta traer lo más nuevo de internet; si no hay conexión, usa lo último guardado. */
const CACHE = 'cuaderno-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;   // los datos (Apps Script) nunca se guardan aquí
  e.respondWith(
    fetch(req).then(res => {
      const copia = res.clone();
      caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./')))
  );
});
