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
    "revision": "05fa4461523fcf4bc53a17f20f49a0df"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "c465c04e9783ec60cdf2b275ac039ae6"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "c399d8eb0b8ddd564a7987277123a303"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "9af54910ca228b5554f3489c967414cd"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "8f2eac79d9cab31847976d54cbdd91b8"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "0760455cd0f8a71ac29c006288badbc9"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "d7791e6a2f09c12288a29cef38e4c6b2"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "fabc12dd2e968d799b99f7132c4113c5"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "ef0b6a8b0b84bf3484473f29ce02e601"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "9985fe995b28065da1da716838fdabf5"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "151f511bd2791ca9d2fb027eba36fe7a"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "88d30f4c14806abc82367297028b91b8"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "5fbc448dadc95372d95e053f92aa80ca"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "9454fbb7400ec55c8fd6daaafa93db2b"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "59c725957d1fd33b918facb54a3a57f7"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "17ac8ea3c6a950bf4c904142457509bf"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "84eaa80fa50986f38a434a82bc20e7bf"
  },
  {
    "url": "404.html",
    "revision": "98c005654c71911144fc9e00a2c5d4bd"
  },
  {
    "url": "about/index.html",
    "revision": "a55eb14089150dc8e101f6340855ab2c"
  },
  {
    "url": "archive/index.html",
    "revision": "b99c55f8a6c915279857950a88d79ae7"
  },
  {
    "url": "img/favicon.ico",
    "revision": "2d1aefa2d4432083fe876eaba13bb1bb"
  },
  {
    "url": "index.html",
    "revision": "5ba573af8a3ab6153e0b34c238c93770"
  },
  {
    "url": "manifest.json",
    "revision": "078d50a769bacf73822ec49b371a2df7"
  },
  {
    "url": "page-list/1/index.html",
    "revision": "627cb27ff5d9ddfd962760f80b648c26"
  },
  {
    "url": "page-list/index.html",
    "revision": "34dc1620ab07df6ce90712c70b5c7051"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "a7a4506634300bc6fe419c68e08d2371"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "3b354fbd0569ae0f1f322c7d113a8dc2"
  },
  {
    "url": "posts/improve-website-speed-with-link-preload/index.html",
    "revision": "865c1d0ade9fcd0e8565474ac9bddf63"
  },
  {
    "url": "tags/index.html",
    "revision": "3d115f2c5b5575dd0824cdfe5d497b9c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
