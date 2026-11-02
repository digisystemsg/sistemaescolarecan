// Service worker mínimo: solo existe para que el navegador considere la
// plataforma instalable como app. No intercepta ni cachea nada todavía.
self.addEventListener('install', (e)=>{ self.skipWaiting(); });
self.addEventListener('activate', (e)=>{ self.clients.claim(); });
self.addEventListener('fetch', (e)=>{ /* sin caché por ahora: siempre pide la versión real al servidor */ });
