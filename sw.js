const version = "62f4528";
const currentCacheName = `ELCWEB-${version}`;
const filesToCache = [
    "/extra/browserconfig.xml?v=8dbb903",
    "/posts/2019/?v=85e0c86",
    "/blog/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/extra/sw_template.js?v=4cee959",
    "/theme/images/PDF.svg?v=872b33e",
    "/theme/js/scripts.js?v=1d5c986",
    "/tags/?v=83d953a",
    "/category/hello/?v=ed92e0a",
    "/safari-pinned-tab.svg?v=4686042",
    "/theme/images/RevealJS.svg?v=eb946c8",
    "/categories/?v=9c8155f",
    "/?v=eb02408",
    "/localization.ini?v=b958412",
    "/link/github/?v=b2e5d46",
    "/archives/?v=32a2954",
    "/theme/images/Jupyter.svg?v=056bcc4",
    "/theme/css/style.css?v=cd46ae9",
    "/author/luis-donet/?v=be8fbf1",
    "/sitemap.xml?v=82a3359",
    "/favicon.ico?v=b758f8a",
    "/authors/?v=d23e58b",
    "/site.webmanifest?v=fc0e17a",
    "/feeds/all-en.atom.xml?v=08ae0e7",
    "/theme/images/DOC.svg?v=5d41948",
    "/posts/hello-world/images/hello/hola!-thumbnail.jpg?v=b037159",
    "/feeds/luis-donet.atom.xml?v=d6aa931",
    "/pages/about/?v=9a520a6",
    "/posts/2019/Nov/?v=f1acee9",
    "/posts/hello-world/?v=0cb9bc8",
    "/tag/probability/?v=ce3401e",
    "/feeds/luis-donet.rss.xml?v=46f389a"
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
