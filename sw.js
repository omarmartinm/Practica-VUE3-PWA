const CACHE_NAME = "v1_contador_vue"
const urlsToCache = [
    "./",
    "./icons/favicon.png",
    "./icons/icon32.png",
    "./icons/icon64.png",
    "./icons/icon128.png",
    "./icons/icon256.png",
    "./icons/icon512.png",
    "./icons/icon1024.png",
    "./js/main.js",
    /*"https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",*/
    "./js/mountApp.js",
    "./css/style.css",
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                return caches.delete(cacheName)
                            }
                        }                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){
                    return res
                }
                return fetch(e.request)
            }
        )
    )
})