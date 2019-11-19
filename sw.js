const version = "15a9b5e";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/posts/2019/Nov/?v=35c27a2",
    "/posts/2019/?v=3c90b2f",
    "/author/luis-donet/?v=71931e8",
    "/extra/browserconfig.xml?v=8dbb903",
    "/sitemap.xml?v=1ef8c6c",
    "/extra/sw_template.js?v=4cee959",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/?v=330a244",
    "/localization.ini?v=b958412",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/tag/probability/?v=9f8bcaf",
    "/theme/images/DOC.svg?v=5d41948",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/link/github/?v=b2e5d46",
    "/categories/?v=522f3b5",
    "/feeds/luis-donet.atom.xml?v=eb63b73",
    "/favicon.ico?v=b758f8a",
    "/authors/?v=d23e58b",
    "/posts/hello-world/?v=721443d",
    "/theme/images/PDF.svg?v=872b33e",
    "/feeds/all-en.atom.xml?v=c9998c8",
    "/pages/about/?v=9a520a6",
    "/theme/css/style.css?v=cd46ae9",
    "/category/hello/?v=5a2d842",
    "/safari-pinned-tab.svg?v=4686042",
    "/theme/js/scripts.js?v=1d5c986",
    "/tags/?v=83d953a",
    "/site.webmanifest?v=fc0e17a",
    "/archives/?v=3d1de7e",
    "/feeds/luis-donet.rss.xml?v=e0a4d73"
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
