const version = "e8ee74c";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/extra/browserconfig.xml?v=8dbb903",
    "/posts/2019/Nov/?v=86901cd",
    "/sitemap.xml?v=76c6c03",
    "/extra/sw_template.js?v=4cee959",
    "/localization.ini?v=b958412",
    "/feeds/luis-donet.atom.xml?v=863141a",
    "/pages/about/?v=ccde925",
    "/theme/css/style.css?v=cd46ae9",
    "/authors/?v=59c02be",
    "/archives/?v=32ea6a0",
    "/category/hello/?v=e063b8b",
    "/posts/2019/?v=08c907e",
    "/feeds/luis-donet.rss.xml?v=8461c10",
    "/safari-pinned-tab.svg?v=4686042",
    "/theme/js/scripts.js?v=1d5c986",
    "/author/luis-donet/?v=8d40fac",
    "/tag/probability/?v=9f2c428",
    "/posts/hello-world/?v=bf7f0c3",
    "/theme/images/PDF.svg?v=872b33e",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/tags/?v=b656526",
    "/categories/?v=42083ac",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/favicon.ico?v=b758f8a",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/?v=af72181",
    "/feeds/all-en.atom.xml?v=af5166d",
    "/site.webmanifest?v=fc0e17a",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/theme/images/DOC.svg?v=5d41948",
    "/link/github/?v=b2e5d46"
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
