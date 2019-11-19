const version = "a33d20d";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/theme/images/PDF.svg?v=872b33e",
    "/extra/browserconfig.xml?v=8dbb903",
    "/category/hello/?v=ed92e0a",
    "/link/github/?v=b2e5d46",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/feeds/all-en.atom.xml?v=08ae0e7",
    "/tags/?v=83d953a",
    "/sitemap.xml?v=53a8892",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/safari-pinned-tab.svg?v=4686042",
    "/favicon.ico?v=b758f8a",
    "/?v=eb02408",
    "/theme/css/style.css?v=cd46ae9",
    "/theme/images/DOC.svg?v=5d41948",
    "/categories/?v=9c8155f",
    "/extra/sw_template.js?v=4cee959",
    "/posts/2019/?v=85e0c86",
    "/authors/?v=d23e58b",
    "/tag/probability/?v=ce3401e",
    "/feeds/luis-donet.rss.xml?v=46f389a",
    "/site.webmanifest?v=fc0e17a",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/feeds/luis-donet.atom.xml?v=d6aa931",
    "/posts/2019/Nov/?v=f1acee9",
    "/posts/hello-world/?v=0cb9bc8",
    "/pages/about/?v=9a520a6",
    "/archives/?v=32a2954",
    "/theme/js/scripts.js?v=1d5c986",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/author/luis-donet/?v=be8fbf1",
    "/localization.ini?v=b958412"
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
