/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox dist configuration
 * and re-run your dist process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "dist/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "dist/p-09b980fd.entry.js"
  },
  {
    "url": "dist/p-3ba3e69f.entry.js"
  },
  {
    "url": "dist/p-3e8ff66b.js"
  },
  {
    "url": "dist/p-3f581901.entry.js"
  },
  {
    "url": "dist/p-41f5a931.entry.js"
  },
  {
    "url": "dist/p-597d4401.js"
  },
  {
    "url": "dist/p-5aac2fb6.entry.js"
  },
  {
    "url": "dist/p-610fdc01.entry.js"
  },
  {
    "url": "dist/p-6360defb.entry.js"
  },
  {
    "url": "dist/p-6939cdb6.entry.js"
  },
  {
    "url": "dist/p-7aab92f3.entry.js"
  },
  {
    "url": "dist/p-a59d460f.entry.js"
  },
  {
    "url": "dist/p-a6c11573.js"
  },
  {
    "url": "dist/p-d2b4bf76.entry.js"
  },
  {
    "url": "dist/p-d429f632.entry.js"
  },
  {
    "url": "dist/p-fc6a2594.entry.js"
  },
  {
    "url": "index.html",
    "revision": "0013f9dad1f602ad733f2d818c06ea41"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
