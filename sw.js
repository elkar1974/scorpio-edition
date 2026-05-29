const CACHE_NAME = 'scorpio-edition-v1';
const urlsToCache = [
    './',
    './index.html',
    './catalogo.html',
    './logo_scorpio.png'
];

// Installa il Service Worker e salva in memoria i file visivi di base
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aperta');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercetta le richieste: Prova a scaricare i dati freschi da internet (per avere sempre il database aggiornato),
// se non c'è linea (offline), carica i file salvati in memoria.
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});