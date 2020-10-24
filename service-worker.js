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

workbox.navigationPreload.enable();

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
    "revision": "84bde497596bdd167040faf1c1432035"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "d98ef7e657901302e3600163ec681f03"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "54c424202dce8b4523e00a67a5022805"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "9153679628bfec0cfe16837d87d2e4f3"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "3549a7b571a84a6415357c2a81517934"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "f04699b6771c9802d3c95c7cfa748225"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "82e6c98bb8f88c7802162fa61f6d6ce9"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "d0c8ba83f7569484cc936a5df46fb658"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "5c495819a8982125c6df52a26350bde7"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "7b84be801e00192060bbf28934c843a9"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "5b42eb1c32509cea7cff497147edb779"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "662c5917dd2bc0dbe8de60f682d1cb27"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "da1af8b6d373e7c83c67bb9eb4c23244"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "d1e8ac76b270df89ec72aa5184999acd"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "5dc3725999ef1b9e8cd54983cffb62a9"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "e48149a1ca77bd22f0be6afb21650f1a"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "20dec072eb75efdd7b5cffb0b2625df0"
  },
  {
    "url": "404.html",
    "revision": "b5487dc4b9bf5da5883dc3e6da5a59d0"
  },
  {
    "url": "about/index.html",
    "revision": "263ea667d0de2a11556a9b50f439c62a"
  },
  {
    "url": "archive/index.html",
    "revision": "1e8766dce98f110a22ff054ace906182"
  },
  {
    "url": "img/favicon.ico",
    "revision": "2d1aefa2d4432083fe876eaba13bb1bb"
  },
  {
    "url": "index.html",
    "revision": "5bdad11bca38ab4e63dd972de699b24a"
  },
  {
    "url": "manifest.json",
    "revision": "078d50a769bacf73822ec49b371a2df7"
  },
  {
    "url": "page-list/1/index.html",
    "revision": "8e18ab18457b4aa95e1463e8c80de8c9"
  },
  {
    "url": "page-list/index.html",
    "revision": "e4b6a9653c399ae9b0742f8a24c11798"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "b8710aba9f9dc926f77fe6689063ab16"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "a3607d5b75d9960a8818a015539a0b79"
  },
  {
    "url": "posts/fix-the-flow-server-is-not-responding-issue-mac-osx/index.html",
    "revision": "ed6d3849063cebd86f2a0306d3cdb2f6"
  },
  {
    "url": "posts/improve-website-speed-with-link-preload/index.html",
    "revision": "e4968d66698f435493a86f00af0f4163"
  },
  {
    "url": "tags/index.html",
    "revision": "6efaae757cd29457db01ccf6a4857ced"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
