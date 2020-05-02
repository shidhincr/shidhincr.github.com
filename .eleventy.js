const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require('eleventy-plugin-pwa');
const accessibilityPlugin = require("eleventy-plugin-accessibility");
const htmlmin = require("html-minifier");
const readingTime = require("eleventy-plugin-reading-time");
const CleanCSS = require("clean-css");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const Terser = require("terser");
const _ = require("lodash");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    appendInitScript: false
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(readingTime);
  // eleventyConfig.addPlugin(accessibilityPlugin);
  eleventyConfig.addPlugin(pluginPWA, {
    cleanupOutdatedCaches: true,
    navigationPreload: true,
    globPatterns: [
      "**/*.{html,mjs,map,webp,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}"
    ],
  });
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLL yyyy");
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log("Terser error: ", minified.error);
      return code;
    }

    return minified.code;
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("excerpt", post => {
    const content = post.templateContent || "";
    const rgx = new RegExp("<!-- more -->", "igm");
    const arr = content.split(rgx);
    if (!arr[1]) {
      return post.data.description || "";
    }
    return arr[0];
  });

  eleventyConfig.addFilter("log", data => {
    return console.dir(data);
  });

  eleventyConfig.addFilter("keys", obj => {
    return _.keys(obj);
  });

  eleventyConfig.addFilter("groupByYear", posts => {
    const _posts = _.groupBy(posts, function(post) {
      const year = new Date(post.date).getFullYear();
      return year;
    });
    return _posts;
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("robots.txt");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItContainer = require("markdown-it-container");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options)
      .use(markdownItAnchor, opts)
      .use(markdownItContainer, "image-center")
      .use(markdownItContainer, "info")
  );

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
