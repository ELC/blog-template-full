const version = "24a04a5";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/posts/2019/?v=85e0c86",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/favicon.ico?v=b758f8a",
    "/posts/2019/Nov/?v=f1acee9",
    "/feeds/luis-donet.rss.xml?v=46f389a",
    "/tag/probability/?v=ce3401e",
    "/categories/?v=9c8155f",
    "/site.webmanifest?v=fc0e17a",
    "/theme/images/DOC.svg?v=5d41948",
    "/archives/?v=32a2954",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/pages/about/?v=9a520a6",
    "/theme/js/scripts.js?v=1d5c986",
    "/theme/images/PDF.svg?v=872b33e",
    "/tags/?v=83d953a",
    "/feeds/all-en.atom.xml?v=08ae0e7",
    "/?v=eb02408",
    "/extra/browserconfig.xml?v=8dbb903",
    "/extra/sw_template.js?v=4cee959",
    "/category/hello/?v=ed92e0a",
    "/posts/hello-world/?v=0cb9bc8",
    "/link/github/?v=b2e5d46",
    "/theme/css/style.css?v=cd46ae9",
    "/localization.ini?v=b958412",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/authors/?v=d23e58b",
    "/safari-pinned-tab.svg?v=4686042",
    "/sitemap.xml?v=1ea54a3",
    "/feeds/luis-donet.atom.xml?v=d6aa931",
    "/author/luis-donet/?v=be8fbf1",
    "/theme/images/RevealJS.svg?v=eb946c8"
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
