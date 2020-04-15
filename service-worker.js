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

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2013/09/26/some-gotchas-in-arithmetic-expression-evaluation-javascript/index.html",
    "revision": "9eec365802cb90d4f3704fdeb693f643"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "bc1a9462ea400cb3df3a9c8216c15fe6"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "460bbcef0228fe217cc23ad35ebb9845"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "39c0a995ebb518bfc68ffd48fb20c519"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "ec379d87144e4fb1d7668f5381df0017"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "338c82615288f203e264f9dfcd6200f7"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "b9d9e878b852e2a5c25fd3f74a5673ae"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "9bee99e4ab7be23a14452158b69f2b1f"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "6ee41b555302aa042fedda5329b7f61a"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "ce345d26b607d0cc686b6c8aa7135c16"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "e2a97f5954c8c56351e66fea6de9841e"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "a05ecc161bdd8b99e8709109dfb6675b"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "7f4b3215e5c9d80a049463d115b057ac"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "e19084931b92bff3e7054a4166017da6"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "7b22cec06c4bba881ec5d4b552f68e50"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "937fc210fe1a5ed06a02ca19d8088576"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "35add20354e9270c0c9b35e6101a3159"
  },
  {
    "url": "404.html",
    "revision": "caafe5ecb262ebb76be888ef81c8eda8"
  },
  {
    "url": "about/index.html",
    "revision": "d907562bddfbe228106d4164e364a19c"
  },
  {
    "url": "archive/index.html",
    "revision": "1f46e06f2edf60bb4067ea768626d3e8"
  },
  {
    "url": "css/index.css",
    "revision": "e7ca83d7dd43155632ca09b2a3a45c30"
  },
  {
    "url": "css/prism-dark.css",
    "revision": "9e2a6102796f5d67607694272d195b95"
  },
  {
    "url": "img/favicon.ico",
    "revision": "2d1aefa2d4432083fe876eaba13bb1bb"
  },
  {
    "url": "index.html",
    "revision": "0636906af6d5cb17be46040bebbead26"
  },
  {
    "url": "js/load-disqus-comments.js",
    "revision": "7e430790260f5ae5c144fe787071d9e6"
  },
  {
    "url": "manifest.json",
    "revision": "078d50a769bacf73822ec49b371a2df7"
  },
  {
    "url": "page-list/1/index.html",
    "revision": "8239c6a84576f292d5c66d3c2448bc9d"
  },
  {
    "url": "page-list/index.html",
    "revision": "b4ba119badb43921b58cb8e19777a2fa"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "c7ffe5d8ed45054a399afb3bc000b054"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "522a1f47bbfb39c051a1ab5eb7637b09"
  },
  {
    "url": "tags/index.html",
    "revision": "96b58cd5546c312ea86f8ffe1409bfa7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
