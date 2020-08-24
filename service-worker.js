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
    "revision": "349822ced2f89cfbca60410a9f3a38d4"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "2b60aebc1c685ff4b19110fbd6a6fca5"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "947d07f9f9935bcf2959e5369d3222e5"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "42a0174c73fc7577bf35bb9edcae97f0"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "234b6770e8892b44ce5783e9e133a074"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "4cf6fcf0c26d4642da9f928eac1f730c"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "8c7337fc2b9f7362531136c18f38de94"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "ad7209032d3ed4b1f603ab02d9a1f945"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "a47808b598126a6379cff2fbdf8cc562"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "c771b42f018cb89f0aee1d5babf83085"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "ab06db12bfa06dacccc058b16ce4df7b"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "a95b9407b0a1f6290a91042ccffe1265"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "23df759b89fa014dce8b491a30577fd0"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "bbab5316caabcdf21862aebe9a7de200"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "a7af66b3286263c1b44afdaaf6bb7baa"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "5c14ffecffa88ec79dfa38b58719374e"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "2a5d2dc3fa3f68548ca0de976c99e5a1"
  },
  {
    "url": "404.html",
    "revision": "67f7b7ee4bbf1d0b9084ab78a94b62a1"
  },
  {
    "url": "about/index.html",
    "revision": "6cd044e32baa28d8083fa75b50685e9c"
  },
  {
    "url": "archive/index.html",
    "revision": "2debf585a4e7f82b96fe92550857363a"
  },
  {
    "url": "img/favicon.ico",
    "revision": "2d1aefa2d4432083fe876eaba13bb1bb"
  },
  {
    "url": "index.html",
    "revision": "94bcdd9012b70e08031b89e64e309bfc"
  },
  {
    "url": "manifest.json",
    "revision": "078d50a769bacf73822ec49b371a2df7"
  },
  {
    "url": "page-list/1/index.html",
    "revision": "c4cd3847a9332fc1fef3a2ee28047a31"
  },
  {
    "url": "page-list/index.html",
    "revision": "f7ad71c7bc86f1ebf4442064793cba1b"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "2eea2a1f673da117a9589e63f9d6f1e5"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "2dd611032ec275e109d5e8b3b045520f"
  },
  {
    "url": "posts/improve-website-speed-with-link-preload/index.html",
    "revision": "e5cc76fa70f679a330fd1648976bf381"
  },
  {
    "url": "tags/index.html",
    "revision": "8bf9561eda330f3c98963a199c022fe3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
