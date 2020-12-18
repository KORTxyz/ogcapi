/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
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
    "url": "dist/kortxyz-components/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "dist/kortxyz-components/p-09707f39.js"
  },
  {
    "url": "dist/kortxyz-components/p-0a16979d.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-14d2f101.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-2329d0e9.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-2efe33d7.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-3daf36ee.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-3dc272a5.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-3e40396f.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-3e8ff66b.js"
  },
  {
    "url": "dist/kortxyz-components/p-4502703a.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-4bfc283d.js"
  },
  {
    "url": "dist/kortxyz-components/p-596ed185.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-abed492c.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-c99f12d3.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-e5ed1197.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-eef6b37a.entry.js"
  },
  {
    "url": "dist/kortxyz-components/p-f4ecfe08.js"
  },
  {
    "url": "index.html",
    "revision": "14827876f276d67a55d3c19bc4e25025"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
