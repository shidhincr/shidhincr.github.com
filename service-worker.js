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
    "revision": "82026f8cabc401fa2d7907697ed29675"
  },
  {
    "url": "2013/10/15/octopress-blog-tweaks-adding-author-information-section-below-each-posts/index.html",
    "revision": "f2df27b5e5c56dfe4c7458ee05d9ccdb"
  },
  {
    "url": "2014/02/03/multiple-left-hand-assignment-in-javascript-is-really-bad-think-once-before-you-do-it/index.html",
    "revision": "50e5a5bf6f0d86dbf3eefa07e8412ae0"
  },
  {
    "url": "2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/index.html",
    "revision": "9b82f380233bcf96555439ae77cd79fc"
  },
  {
    "url": "2014/02/17/resolve-in-angularjs-routes-explained-as-story/index.html",
    "revision": "a0ac33df60261bceaef0e1dac4d0b056"
  },
  {
    "url": "2014/02/25/angularjs-real-time-model-persistence-using-local-storage/index.html",
    "revision": "a1880523b78bfd42e30e290c563785d8"
  },
  {
    "url": "2014/06/26/explaining-call-and-apply-in-javascript-through-mr-dot-dave/index.html",
    "revision": "085a6eab47d697a4b2f60230505f758d"
  },
  {
    "url": "2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/index.html",
    "revision": "a3680d6a3da8103eab2b224eb1b28e98"
  },
  {
    "url": "2014/08/11/a-brief-walk-through-of-the-ng-options-in-angularjs/index.html",
    "revision": "554904693eb978d722e746f3f5632f0d"
  },
  {
    "url": "2015/03/17/remote-debugging-localhost-with-weinre/index.html",
    "revision": "7d5cfb0057c5c167c58ea1dc76149117"
  },
  {
    "url": "2015/03/19/implementing-a-curry-function-in-javascript-using-tdd/index.html",
    "revision": "d862df9f67ecbe343106eca5aecf1a51"
  },
  {
    "url": "2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/index.html",
    "revision": "aca14d6a0cc0ce63be36058af4cee325"
  },
  {
    "url": "2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/index.html",
    "revision": "e4adb56f5c30522912f19348a599f74e"
  },
  {
    "url": "2015/07/31/iterm-tips-and-zsh-plugins-for-better-development-environment/index.html",
    "revision": "ded7863dcbf442d0b9afdf8f03a29dce"
  },
  {
    "url": "2015/12/27/injecting-custom-javascript-into-react-natives-webview/index.html",
    "revision": "82d3e960c3505034e4a828f75acf9961"
  },
  {
    "url": "2016/01/21/react-redux-part-1-implementing-a-counter-component-in-react-by-using-state/index.html",
    "revision": "289a88f3eb1399e093cd2270e1182b60"
  },
  {
    "url": "2016/04/21/debugging-react-native-apps-using-visual-studio-code/index.html",
    "revision": "a7b83413b3dcdf33884f18af9f769e61"
  },
  {
    "url": "404.html",
    "revision": "183ece9cc55d96baf493dcb6949515dd"
  },
  {
    "url": "about/index.html",
    "revision": "20f6153e362643e9a929a27a1eb10034"
  },
  {
    "url": "archive/index.html",
    "revision": "08c04fd57cc8c545990c04bcb2c3c9a6"
  },
  {
    "url": "css/fonts.css",
    "revision": "0446d76934b0ca77cb037dc592606f2c"
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
    "url": "img/404.png",
    "revision": "e5e28b7f54008eb573f72ed4cf52fef3"
  },
  {
    "url": "img/android-icon-144x144.png",
    "revision": "6e5e66da0758debc5612266ade85ec6d"
  },
  {
    "url": "img/android-icon-192x192.png",
    "revision": "cc26b89a111c9d64c79be562b59a93fc"
  },
  {
    "url": "img/android-icon-36x36.png",
    "revision": "a19cb204d33060da976c8e4e80e2dbb0"
  },
  {
    "url": "img/android-icon-48x48.png",
    "revision": "f914de20326d4e339d3abbc4002bb8ba"
  },
  {
    "url": "img/android-icon-72x72.png",
    "revision": "6545c8d98c140551aad0ec696f41cdb5"
  },
  {
    "url": "img/android-icon-96x96.png",
    "revision": "4fdffa81626448aab0d9c7b470f8f0fa"
  },
  {
    "url": "img/apple-icon-114x114.png",
    "revision": "d0d05cac888fa98f5aef5cb5c78cb77d"
  },
  {
    "url": "img/apple-icon-120x120.png",
    "revision": "7e14ca2838a35321fe85e812bf6af990"
  },
  {
    "url": "img/apple-icon-144x144.png",
    "revision": "6e5e66da0758debc5612266ade85ec6d"
  },
  {
    "url": "img/apple-icon-152x152.png",
    "revision": "adc5d55db797e60398a86441dde38fd8"
  },
  {
    "url": "img/apple-icon-180x180.png",
    "revision": "7ded0aac6e33b607ea5c0fb4b85ef0db"
  },
  {
    "url": "img/apple-icon-57x57.png",
    "revision": "d1b1da7e4d711f59da1727496e6ab86e"
  },
  {
    "url": "img/apple-icon-60x60.png",
    "revision": "3a4e2f1d1d7c62a51d24bfe7ded4a2c1"
  },
  {
    "url": "img/apple-icon-72x72.png",
    "revision": "6545c8d98c140551aad0ec696f41cdb5"
  },
  {
    "url": "img/apple-icon-76x76.png",
    "revision": "89d14889a1c543f8b7ff9d0f06c4cd52"
  },
  {
    "url": "img/apple-icon-precomposed.png",
    "revision": "be91bd1bf6732b11689370defe5d004e"
  },
  {
    "url": "img/apple-icon.png",
    "revision": "be91bd1bf6732b11689370defe5d004e"
  },
  {
    "url": "img/favicon-16x16.png",
    "revision": "cd1ed3316c3ba7ebb74adac07b3f014f"
  },
  {
    "url": "img/favicon-32x32.png",
    "revision": "c457d4daf1398a3ddacfb7bee8135ba0"
  },
  {
    "url": "img/favicon-96x96.png",
    "revision": "4fdffa81626448aab0d9c7b470f8f0fa"
  },
  {
    "url": "img/favicon.ico",
    "revision": "2d1aefa2d4432083fe876eaba13bb1bb"
  },
  {
    "url": "img/git-plugin.gif",
    "revision": "9d2ad808f4a793867b99d04b0d925929"
  },
  {
    "url": "img/iterm-ohmyzsh.png",
    "revision": "69191fc8fd2cd221cf958185460a4736"
  },
  {
    "url": "img/iterm-zsh-plugins/autocomplete.png",
    "revision": "226c16aecd041bbde8d6fff83704a231"
  },
  {
    "url": "img/iterm-zsh-plugins/find-cursor.png",
    "revision": "8da09db6b0261e234ec7aedcb67e4c9f"
  },
  {
    "url": "img/iterm-zsh-plugins/git-plugin.gif",
    "revision": "9d2ad808f4a793867b99d04b0d925929"
  },
  {
    "url": "img/iterm-zsh-plugins/iterm-ohmyzsh.png",
    "revision": "69191fc8fd2cd221cf958185460a4736"
  },
  {
    "url": "img/iterm-zsh-plugins/new-tab.png",
    "revision": "0099f828c3678981d980da40badb6e7e"
  },
  {
    "url": "img/iterm-zsh-plugins/paste-history.png",
    "revision": "b7ffb8293c26a006a211656179d282ac"
  },
  {
    "url": "img/iterm-zsh-plugins/Screen Shot 2015-07-31 at 11.24.59 AM.png",
    "revision": "226c16aecd041bbde8d6fff83704a231"
  },
  {
    "url": "img/iterm-zsh-plugins/Screen Shot 2015-07-31 at 12.39.47 PM.png",
    "revision": "8da09db6b0261e234ec7aedcb67e4c9f"
  },
  {
    "url": "img/iterm-zsh-plugins/Screen Shot 2015-07-31 at 12.51.41 PM.png",
    "revision": "b7ffb8293c26a006a211656179d282ac"
  },
  {
    "url": "img/iterm-zsh-plugins/search-tabs.png",
    "revision": "d546d5899233d777f7d3bbfa6c8e1764"
  },
  {
    "url": "img/iterm-zsh-plugins/z-plugin.gif",
    "revision": "5b2a625cb04fa249a0f4d91da9c662d8"
  },
  {
    "url": "img/manifest.json",
    "revision": "458451bab9ba4ef98621504b13f60c3a"
  },
  {
    "url": "img/ms-icon-144x144.png",
    "revision": "6e5e66da0758debc5612266ade85ec6d"
  },
  {
    "url": "img/ms-icon-150x150.png",
    "revision": "6f01f6718d1e40d5c0bc99d47b23651d"
  },
  {
    "url": "img/ms-icon-310x310.png",
    "revision": "7ab55aeb1311cf2ce1d81ae7b2141fe7"
  },
  {
    "url": "img/ms-icon-70x70.png",
    "revision": "42898dee89c8e71ead6634217a1e2b3d"
  },
  {
    "url": "img/New Folder With Items/git-plugin.gif",
    "revision": "9d2ad808f4a793867b99d04b0d925929"
  },
  {
    "url": "img/New Folder With Items/iterm-ohmyzsh.png",
    "revision": "69191fc8fd2cd221cf958185460a4736"
  },
  {
    "url": "img/New Folder With Items/Screen Shot 2015-07-31 at 11.24.59 AM.png",
    "revision": "226c16aecd041bbde8d6fff83704a231"
  },
  {
    "url": "img/New Folder With Items/Screen Shot 2015-07-31 at 12.39.47 PM.png",
    "revision": "8da09db6b0261e234ec7aedcb67e4c9f"
  },
  {
    "url": "img/New Folder With Items/Screen Shot 2015-07-31 at 12.51.41 PM.png",
    "revision": "b7ffb8293c26a006a211656179d282ac"
  },
  {
    "url": "img/New Folder With Items/z-plugin.gif",
    "revision": "5b2a625cb04fa249a0f4d91da9c662d8"
  },
  {
    "url": "img/ng-options.jpg",
    "revision": "cd708432ddd54763b1ffd8e9fe3ff429"
  },
  {
    "url": "img/react-jest.jpg",
    "revision": "7af440db8d79cf13a511f1ab3deb2689"
  },
  {
    "url": "img/scopes_in_directives.png",
    "revision": "5929c57924704231f6485b6ec929cc2b"
  },
  {
    "url": "img/Screen Shot 2015-07-31 at 11.24.59 AM.png",
    "revision": "226c16aecd041bbde8d6fff83704a231"
  },
  {
    "url": "img/Screen Shot 2015-07-31 at 12.39.47 PM.png",
    "revision": "8da09db6b0261e234ec7aedcb67e4c9f"
  },
  {
    "url": "img/Screen Shot 2015-07-31 at 12.51.41 PM.png",
    "revision": "b7ffb8293c26a006a211656179d282ac"
  },
  {
    "url": "img/shidhin_dp_big.png",
    "revision": "87907fd5506d4f3eb821b118a5a1d98b"
  },
  {
    "url": "img/shidhin_dp_small.png",
    "revision": "850b44708f1f15b6d74c228fad0fcbd5"
  },
  {
    "url": "img/shidhin_dp.png",
    "revision": "42a00e018ae35e087e2fd81318502f3d"
  },
  {
    "url": "img/z-plugin.gif",
    "revision": "5b2a625cb04fa249a0f4d91da9c662d8"
  },
  {
    "url": "index.html",
    "revision": "577232db15b27e18210fa6cdc4e7e31b"
  },
  {
    "url": "js/load-disqus-comments.js",
    "revision": "7e430790260f5ae5c144fe787071d9e6"
  },
  {
    "url": "js/quicklink.mjs",
    "revision": "6dc33c41a988c7ae5e23242a3c8ccdc9"
  },
  {
    "url": "js/quicklink.module.js",
    "revision": "6dc33c41a988c7ae5e23242a3c8ccdc9"
  },
  {
    "url": "js/quicklink.umd.js",
    "revision": "0f94ba90a2a59ff09a112d70381e555a"
  },
  {
    "url": "manifest.json",
    "revision": "078d50a769bacf73822ec49b371a2df7"
  },
  {
    "url": "page-list/1/index.html",
    "revision": "90ce4ea99fd4f28858c69f744a6e61f1"
  },
  {
    "url": "page-list/index.html",
    "revision": "db75010f248b57eacb44976b3f3bfc1a"
  },
  {
    "url": "posts/2013-09-25-starting-my-new-blog-finally-octopress/index.html",
    "revision": "b4553f1abed54860110bf71050824d56"
  },
  {
    "url": "posts/2014-07-15-setting-up-my-macbook-for-development-environment/index.html",
    "revision": "7a5e0b9028b50702a16de9c81a5a9f13"
  },
  {
    "url": "tags/index.html",
    "revision": "2f09b7c1d99e526cf447b3ba530f78bc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
