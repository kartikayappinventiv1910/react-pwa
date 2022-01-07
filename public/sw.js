// console.warn("sw from public folder");
// let cacheData = "App-Cache";

var CACHE_STATIC_NAME = "static-v1";
var CACHE_DYNAMIC_NAME = "dynamic-v1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/main.chunk.js",
        "/index.html",
        "/",
        "/user",
        "/about",
        
      ]).catch((err)=>{
        console.log(err)
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ...", event);
  event.waitUntil(
    caches.keys().then(function (keylist) {
      return Promise.all(
        keylist.map(function (key) {
          // if not current cache, remove them
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

this.addEventListener("fetch", (event) => {
  // if (!navigator.onLine) {
  event.respondWith(
    caches.match(event.request).then((result) => {
      if (result) {
        return result;
      } else {
        return fetch(event.request).then((res) => {
          caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            cache.put(event.request.url, res.clone()).catch((err) => {
              console.log(err);
            });
            return res;
          });
        }).catch((err)=>{
          console.log(err)
        });
      }
      // let requestUrl = event.request.clone();
      // return fetch(requestUrl);
    })
  );
  // }
});
