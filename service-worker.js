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
    "revision": "9d32eccea7dc46c486b19a0221b7c4d8"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "50c70ce2783b4a84f1cb924e644de849"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "2190cef738ed79470cbf96bd266459fa"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "8dcb21ca415b18191b05f57478b446b0"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "b16fdcc2c4e23ffabf2d9d7208d8f4b5"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "b73f36e21350c950651488abf50482b2"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "fd040b00f29f8c22b09f39901f9a35a9"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "db7889884ad269800f3f6cd70fd9330a"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "7c0cde3410ada31ae1f9173ae30cd4bb"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "e5a6456c54b585ce66e6ffe043dd5d8c"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "307ff164c58e35ed400fe8f971dd6817"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "92d39b3a5e9ab4a011743c976221539e"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "01facdb53fb717a6b92318608756b166"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "00c4d3455979eef72e65f34cc4793f14"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "a0c36601b61083a37f347db3f74fa87b"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "65afef02f99eb680250727cbba259254"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "784aac0df89d6014a0066f70d08cbd03"
  },
  {
    "url": "404.html",
    "revision": "b44402b2a0f4742646e1d20e81b6c946"
  },
  {
    "url": "about/index.html",
    "revision": "34b376906d8cb298486d12b781f9ed07"
  },
  {
    "url": "archive/index.html",
    "revision": "f368bf82876e309a4e0098b748caab01"
  },
  {
    "url": "img/favicon.ico",
    "revision": "2d1aefa2d4432083fe876eaba13bb1bb"
  },
  {
    "url": "index.html",
    "revision": "c4176b56be2c6b71361e4072e3b40d45"
  },
  {
    "url": "manifest.json",
    "revision": "078d50a769bacf73822ec49b371a2df7"
  },
  {
    "url": "page-list/1/index.html",
    "revision": "ae9d78505818ec6fa4d0c69a5ebee73e"
  },
  {
    "url": "page-list/index.html",
    "revision": "7e9b5c70fa8c8497fc2f282dddbda834"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "d50759d9dc60155b1dde0385bf9457b7"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "44214f27a4f3aca3316ce81e2e9fb464"
  },
  {
    "url": "posts/improve-website-speed-with-link-preload/index.html",
    "revision": "8fb49b5d14076a373d60d4985b74cf39"
  },
  {
    "url": "tags/index.html",
    "revision": "9f5387794503860b1a86de40dd08050c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
