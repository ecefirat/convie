const CACHE_NAME = "version-1";
// const urlsToCache = ["index.html", "offline.html", "images/convieLogoGif.gif"];
const urlsToCache = ["index.html", "../components/Main/Main.js"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      console.log("fetching cache");
      return fetch(event.request).catch(
        () => caches.match("../components/Main/Main.js")
        // caches.match("offline.html")
      );
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("deleting old cache");
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});