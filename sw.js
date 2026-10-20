/* Permite rezar sin conexión. Sube la versión al cambiar archivos.
   Estrategia: responde al instante con lo guardado y actualiza en segundo plano;
   así la app abre rápido aunque haya poca señal (en el carro, por ejemplo). */
const CACHE = "rosario-v3";
const ARCHIVOS = [
  "./", "index.html", "css/styles.css", "js/tema.js", "js/data.js", "js/app.js",
  "icon.svg", "manifest.webmanifest",
  "img/virgen-fatima.svg", "img/medalla-milagrosa.svg", "img/medalla-reverso.svg",
  "img/icono-192.png", "img/icono-512.png", "img/apple-touch-icon.png",
  "fonts/lora.woff2", "fonts/lora-italic.woff2",
  "fonts/cormorant-garamond.woff2", "fonts/cormorant-garamond-italic.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)));
});

// La app pide activar la versión nueva cuando la persona pulsa «Actualizar»
self.addEventListener("message", (e) => {
  if (e.data === "activar") self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const clave = req.mode === "navigate" ? "index.html" : req;
  const deRed = fetch(req).then(async (r) => {
    if (r.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(clave, r.clone());
    }
    return r;
  });
  e.waitUntil(deRed.catch(() => {}));
  e.respondWith(caches.match(clave, { ignoreSearch: true }).then((guardado) => guardado || deRed));
});
