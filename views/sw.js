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
    "url": "dist/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "dist/p-0e711886.entry.js"
  },
  {
    "url": "dist/p-2069e38c.js"
  },
  {
    "url": "dist/p-2909aad3.entry.js"
  },
  {
    "url": "dist/p-2cf18c95.entry.js"
  },
  {
    "url": "dist/p-3e8ff66b.js"
  },
  {
    "url": "dist/p-4bfc283d.js"
  },
  {
    "url": "dist/p-51984827.entry.js"
  },
  {
    "url": "dist/p-5a35e0a0.entry.js"
  },
  {
    "url": "dist/p-5e776104.entry.js"
  },
  {
    "url": "dist/p-6ba886ce.entry.js"
  },
  {
    "url": "dist/p-7228dc20.entry.js"
  },
  {
    "url": "dist/p-acaf509b.entry.js"
  },
  {
    "url": "dist/p-afa081d9.entry.js"
  },
  {
    "url": "dist/p-b4e37136.entry.js"
  },
  {
    "url": "dist/p-ccdb82dd.entry.js"
  },
  {
    "url": "dist/p-ce3bc777.entry.js"
  },
  {
    "url": "index.html",
    "revision": "5d2ec94e20cd7b60355a4d9936162dd1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
