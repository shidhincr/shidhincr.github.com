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
    "revision": "155e76fd072082ec72488d5f132f8a89"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "efa7da1284df5d0a25965e26c7263745"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "d833798e39ffdbb2ead960f62d6c3d37"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "5aa825e3ed2a31f41fbf3732ea564218"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "7539b6a7e1797affb1c4a75e4958a57f"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "409fdef516080471065fa94eb466657d"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "770c185f9a8f57b8228d023ef8b54eb6"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "65e4fcdb490b2c3652ce4d670efa62d3"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "0cc249e4a752b3ebf9b74ec4f956d7ba"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "40fefd197b411555997d9fecaae61d8a"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "6c6c1fb5222b4063afb541624ea11933"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "ed127954b75dad2f034172ad1d6117cc"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "4c6c89cd9388ed11e05e39f2e282903e"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "64b72e86204c0e185b508e42c75c1a37"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "68b8f95c0c19d655fa9ae2a1caa2a080"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "e7bb157097617182de21677f380ecfc9"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "19c240e80d4584981355c82da53b56ac"
  },
  {
    "url": "404.html",
    "revision": "0abc25f4d6b6a0d0ac867d7177d57c36"
  },
  {
    "url": "about/index.html",
    "revision": "be5641046dfe3ff25083179b6c25af68"
  },
  {
    "url": "archive/index.html",
    "revision": "30d0576cf9176bd4fec2762b2f7e29b7"
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
    "revision": "29969fb12a94926f11fbcff11f1afc3d"
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
    "revision": "319c2126b44c855a3d5c42a87ef084f6"
  },
  {
    "url": "page-list/index.html",
    "revision": "054226f7c2e519e4e887cfd1cf26fc69"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "a3c3c7216ce85dcae7aae22d6d18b8dd"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "f4534c46d9c2d13e24e9f3656e4b6614"
  },
  {
    "url": "tags/index.html",
    "revision": "40c01e9b4078e1a190f62b61c0a20709"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
