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
    "revision": "603ad4cc1e82eaf79222b2a614e9fc84"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "61ef492e54a364662d0cf549f649195d"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "01f8ce9a18f3870a87dc7944a9da0e24"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "4c7b1e9b9af05719d05ae79b54629ff3"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "9e2707b31d60b64905096319da195f7e"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "cd0272916fa3d03ff3d106dd2352dc0b"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "d5e9d80fe35fe4b3c69da50b8a13b3d6"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "c9862bbd8b92f44975872b8693e1cdb8"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "01dbda07292467c457671941be6d8166"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "3341db42f134aacc2f0412a5c32c15a9"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "e7baddee57e186c50886b15d0892e62f"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "ace049faa234d19e29fe6d88c027145f"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "5d3373f3160995bcaab7cdedc1f58bb1"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "295e598c461cf866b195b431c56cf04e"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "a31c5aabe367e13ecae1d6891ea0a2e0"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "5c611be396b902c50edadf48be74f0dd"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "3e27f9626f04706e11be7d368770fd4c"
  },
  {
    "url": "404.html",
    "revision": "2c8bf7c6cd3d6fc295d0524dfb4f8236"
  },
  {
    "url": "about/index.html",
    "revision": "98f142f6a8304088c6ae3fc7302b3689"
  },
  {
    "url": "archive/index.html",
    "revision": "af66e0391c90d43e433148f01a7a7dea"
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
    "revision": "ea3b23d6e930975c3ca2206ddc7f3a50"
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
    "revision": "30c4b32a3c1c0b982cd0987ae818b865"
  },
  {
    "url": "page-list/index.html",
    "revision": "36480cccee8918141d9e08f3da169950"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "792307dc2e45083a27d773178baaedaf"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "e121b4af2fc1d4c6a74c751ae8107f57"
  },
  {
    "url": "tags/index.html",
    "revision": "7e3a3585aa020533c3b3a3e21e477ecb"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
