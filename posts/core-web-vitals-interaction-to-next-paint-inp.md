---
layout: post
title: "Core Web Vitals: Interaction to Next Paint (INP)"
date: 2022-03-16
author: Shidhin C R
published: true
comments: true
categories:
- Web performance
- Core Web Vitals
- INP
---
Have you ever clicked on a button or typed something on a website and waited for a long time before anything happened? If so, you have experienced a poor user experience due to low responsiveness. Responsiveness is how quickly a website responds to user input, such as clicks, taps, scrolls, and keystrokes. A responsive website should provide immediate feedback to the user and avoid delays or freezes.
<!-- more -->

![interaction to next paint](/img/blog-images/inp-cwv.webp)

One way to measure responsiveness is by using an experimental metric called Interaction to Next Paint (INP). INP observes the latency of all interactions that a user has made with a website, and reports a single value that represents the longest interaction observed. A low INP means that the website was consistently able to respond quickly to all or most of the user interactions.

INP is different from other metrics that measure responsiveness, such as First Input Delay (FID) or Total Blocking Time (TBT). FID measures the delay between the first interaction and the first browser response, while TBT measures the total amount of time that the main thread was blocked by long tasks. Both FID and TBT only capture a subset of interactions and do not account for subsequent interactions that may occur throughout the lifespan of a page visit. INP captures all interactions and provides a more holistic view of responsiveness.

So how can you improve your INP score? Here are some tips:

- **Reduce JavaScript execution time**. JavaScript is often the main culprit for causing long tasks that block the main thread and delay browser rendering. You can reduce JavaScript execution time by splitting your code into smaller chunks, using code splitting techniques, removing unused code, deferring non-critical scripts, and using web workers or service workers to offload some work from the main thread.
- **Optimize images and fonts**. Images and fonts are often large resources that take time to download and render. You can optimize images by choosing appropriate formats, compressing them, resizing them, using responsive images techniques, lazy loading them, and using image CDNs. You can optimize fonts by choosing web-safe fonts, using font-display property, subsetting fonts, preloading fonts, and using font CDNs.
- **Use performance budgets**. Performance budgets are limits on certain metrics that you set for your website. For example, you can set a budget for how much JavaScript or image size you allow on your pages. Performance budgets help you monitor your website's performance and prevent it from degrading over time due to adding new features or content. You can use tools like Lighthouse or WebPageTest to set up performance budgets and track them over time.

Let's see each of them in detail:

## 1. What is JavaScript execution time?

JavaScript execution time refers to the amount of time spent parsing, compiling, and executing JavaScript files on the browser. By default, JavaScript runs on the main thread, which means it blocks other tasks such as rendering and responding to user input. Therefore, reducing JavaScript execution time can free up the main thread and make your site more responsive.

###  How to measure JavaScript execution time?

One of the tools you can use to measure JavaScript execution time is [Lighthouse](https://developers.google.com/web/tools/lighthouse), an open-source tool that audits web pages for performance, accessibility, best practices, and SEO. Lighthouse provides a metric called **Total Blocking Time (TBT)**, which measures how much time the main thread was blocked by long-running JavaScript tasks during page load.

You can run Lighthouse from Chrome DevTools, from the command line, or as a Node module. You can also use [GTmetrix](https://gtmetrix.com/), a web performance testing tool that incorporates Lighthouse into its analysis.

### How to reduce JavaScript execution time?

There are several strategies you can apply to reduce JavaScript execution time, such as:

- **Implementing code-splitting**: Code-splitting is the technique of splitting your JavaScript bundle into smaller chunks that are loaded on demand. This way, you can avoid loading unnecessary code for parts of your site that are not visible or used by the user. You can use tools like [webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/) to implement code-splitting for your site.
- **Removing unused code**: Unused code is any code that is not executed or referenced by your site. It can come from previous versions of your site, third-party libraries, or unused features. Unused code adds extra bytes to your JavaScript files and increases parsing and compiling time. You can use tools like [Coverage](https://developer.chrome.com/docs/devtools/coverage/) in Chrome DevTools or [PurgeCSS](https://purgecss.com/) to identify and remove unused code from your site.
- **Caching your code with the PRPL pattern**: The PRPL pattern is a set of principles for optimizing web app delivery: Push critical resources for initial URL route; Render initial route; Pre-cache remaining routes; Lazy-load remaining routes on demand. By following this pattern, you can cache your critical code using service workers or HTTP/2 server push and load it faster on subsequent visits. You can use tools like [Workbox](https://developers.google.com/web/tools/workbox) or [Firebase Hosting](https://firebase.google.com/docs/hosting) to implement caching with service workers for your site.
- **Minifying and compressing JavaScript code**: Minifying means removing unnecessary characters such as whitespace, comments, or semicolons from your code without changing its functionality. Compressing means encoding your code using algorithms such as gzip or brotli that reduce its size by finding patterns and replacing them with shorter symbols. Minifying and compressing your code reduces network cost and download time for your users. You can use tools like [UglifyJS](https://github.com/mishoo/UglifyJS) or [Terser](https://terser.org/) to minify your code and tools like [compression-webpack-plugin](https://webpack.js.org/plugins/compression-webpack-plugin/) or [brotli-webpack-plugin](https://github.com/mynameiswhm/brotli-webpack-plugin) to compress it with webpack.

## 2. How to Optimize Images and Fonts for Your Website

Images and fonts are essential elements of any website design. They can enhance the visual appeal, convey the message, and create the mood of your site. However, they can also affect the performance and loading speed of your site if they are not optimized properly.

Optimizing images and fonts means reducing their file size without compromising their quality or readability. This can improve your site's user experience, SEO ranking, and conversion rate. Here are some tips on how to optimize images and fonts for your website.

### Optimize Images

- Choose the right format: Different image formats have different advantages and disadvantages in terms of quality, compression, and compatibility. For example, JPEG is good for photos with many colors and details, PNG is good for images with transparency or sharp edges, and SVG is good for vector graphics that can scale without losing quality.
- Resize and crop: You should resize your images to fit the dimensions of your layout and crop any unnecessary parts. This can reduce the file size significantly and avoid distortion or stretching.
- Compress: You should compress your images to remove any redundant data or metadata that are not needed for displaying the image. There are many tools and plugins that can help you compress your images without losing quality, such as TinyPNG, ImageOptim, or WP Smush.
- Use responsive images: Responsive images are images that adapt to different screen sizes and resolutions by using different sources or attributes. This can help you deliver the optimal image for each device and save bandwidth. You can use HTML5's srcset attribute or picture element to implement responsive images.

### Optimize Fonts

- Choose web-safe fonts: Web-safe fonts are fonts that are widely available on most devices and browsers. They can ensure consistent rendering and avoid font substitution or downloading issues. Some examples of web-safe fonts are Arial, Times New Roman, Verdana, Georgia, etc.
- Use custom fonts sparingly: Custom fonts are fonts that are not web-safe but can add personality and uniqueness to your site. However, they can also slow down your site if they are not optimized properly. You should use custom fonts sparingly and only for headings or accents. You should also choose lightweight custom fonts that have fewer glyphs and variants.
- Use web font services: Web font services are platforms that host custom fonts on their servers and deliver them to your site via CDN (content delivery network). They can help you optimize custom fonts by providing features such as subsetting (removing unused glyphs), compression (reducing file size), caching (storing files locally), fallbacks (providing alternative fonts), etc. Some examples of web font services are Google Fonts, Adobe Fonts, Font Awesome Icons etc.

## 3. Using performance budgets to improve INP

One of the key metrics that performance budgets focus on is Input Delay (INP), which measures how long it takes for the browser to respond to user interactions such as clicks, taps, or scrolls. A high INP means that the user has to wait longer for feedback from the website, which can lead to frustration and abandonment.

To use performance budgets for INP, you need to first define your target INP value based on your audience's needs and expectations. For example, Google recommends an INP of less than 100 milliseconds for most websites. Then, you need to measure your current INP using tools like Lighthouse or WebPageTest. Next, you need to identify and prioritize the factors that affect your INP, such as JavaScript execution time, network latency, or main thread blocking. Finally, you need to implement solutions to optimize your INP, such as code splitting, lazy loading, caching, or using web workers.

Using performance budgets for INP can help you deliver a better user experience and improve your website's conversion rates and retention rates. By setting clear and measurable goals for your website's performance, you can ensure that you are meeting your users' expectations and providing them with a fast and responsive website.

## Summary

By following these tips, you can improve your website's responsiveness and provide a better user experience for your visitors. Remember that INP is an experimental metric that may change over time as it evolves with feedback from developers and users. You can use tools like PageSpeed Insights or Chrome DevTools to measure your INP score and identify opportunities for improvement.

Thanks for reading. Please let me know if you have any comments by pressing the comment button below.
