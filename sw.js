const version = "c459ab5";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/tags/?v=b656526",
    "/extra/browserconfig.xml?v=8dbb903",
    "/category/hello/?v=e063b8b",
    "/localization.ini?v=b958412",
    "/posts/2019/Nov/?v=86901cd",
    "/site.webmanifest?v=fc0e17a",
    "/feeds/all-en.atom.xml?v=af5166d",
    "/pages/about/?v=ccde925",
    "/feeds/luis-donet.rss.xml?v=8461c10",
    "/?v=af72181",
    "/feeds/luis-donet.atom.xml?v=863141a",
    "/favicon.ico?v=b758f8a",
    "/theme/css/style.css?v=cd46ae9",
    "/safari-pinned-tab.svg?v=4686042",
    "/posts/hello-world/?v=bf7f0c3",
    "/theme/js/scripts.js?v=1d5c986",
    "/authors/?v=59c02be",
    "/categories/?v=42083ac",
    "/archives/?v=32ea6a0",
    "/link/github/?v=b2e5d46",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/posts/2019/?v=08c907e",
    "/extra/sw_template.js?v=4cee959",
    "/tag/probability/?v=9f2c428",
    "/author/luis-donet/?v=8d40fac",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/sitemap.xml?v=d36aeb9",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/theme/images/DOC.svg?v=5d41948",
    "/theme/images/PDF.svg?v=872b33e"
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => cacheNames.filter(cacheName => ! currentCacheName.includes(cacheName) ))
      .then(cachesToDelete => Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete))))
      .then(self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  const scope = self.registration.scope;
  
	if (!url.startsWith(scope)) {
		return;
  }

  event.respondWith(
    caches.open(currentCacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}) )
      .then(response => response || fetch(event.request) )
  );
});
