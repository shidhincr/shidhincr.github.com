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
    "revision": "ff63ca444bd10e8c43617fe545886eb1"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "843c6619d444dc4ac697395dd1e052c1"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "9404c0045ede25d1104d990b8e0b5670"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "7bb11c98b7f7c42bd7c37a4c4040eaed"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "dc0029c40d981bd643c9781abf8b98e4"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "280eb1b3d20d8b2a284d5b0ce4b6d610"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "00194821fa8bc110244789dfb9cc9fa3"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "425d7aad190def29b58494e0f9e55581"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "46be47adcb7cc6926c0fea96e3fe2cec"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "eb723c77d61f15d41ee3018bb96b31f6"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "1060c0b1f553750717169ff5b34b0289"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "c0612af77d06ea1c6929c93ea37aafdf"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "04422e026f87c561b92023ff5ccaceba"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "fa1df43c07e96e64f679b66f26ac3039"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "10d7bea991a4e27a9518821e44a8e86e"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "51248c6933d0caf923d2c04b6e2c3806"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "94c089d1033e9bc7a138d67601ca935b"
  },
  {
    "url": "404.html",
    "revision": "fff335124462e10928a7989ddbd9b00a"
  },
  {
    "url": "about/index.html",
    "revision": "1018b75d6cf3e5e84461be302ab7abcc"
  },
  {
    "url": "archive/index.html",
    "revision": "4deae0e0dbd7a73d24a7f07283fceeb0"
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
    "revision": "4dec9f124418e0ffbe56499c81f83618"
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
    "revision": "5da333df2ff085a414f06ed1f63ab366"
  },
  {
    "url": "page-list/index.html",
    "revision": "d2376306c07ad3d4e780c5fe69528c70"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "13a486ff567aea8c8489b726b4be9f7e"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "cb1a9f4d906209714800bef216dad66c"
  },
  {
    "url": "tags/index.html",
    "revision": "fbd1ae4ae30a8fad376b4ab7a64ae65e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
