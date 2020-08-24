---
layout: post
title: "Improve Website Speed with Link Preload"
date: 2020-04-01
author: Shidhin C R
published: true
comments: true
categories:
- Web performance
- Link preload
---

In recent years, Web peformance optimizations became a mandatory skill for every front end developers. Web performance can be classified into two: page load performance and runtime performance. Here in this post, we'll see how to improve the page load performance using **[link preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)**
<!-- more -->

Optimizing the page load or run time performance has a positive impact on the user experience. There are numourous studies shows the conversion rate in e-commerce websites has a direct relationship with the page load time. Every second saved from the page load speed improves the conversion rate.

## What's Link Preload

> Link preload is a **declarative** way to fetch the assets without affecting the **onload event** of your entire page.

<strong class="highlight-text">Link preload is declarative:</strong> Instead of using any browser APIs ( example fetch, XMLHttpRequest ..etc ), we can use the traditonal *link* html tag to download required assets. This is similar to the way we include any stylesheet file in our HTML page. Here is an example of preloading a css file using link preload:

```html
<head>
  <link rel="preload" href="/css/main.css" as="style">
</head>
```

Don't worry about those attributes. I will explain them in below sections.

<strong class="highlight-text">Link preload does not affect onload event:</strong> Normally, while parsing the HTML, browser fetches and evaluates the assets ( JS, CSS, Images ..etc ). This, will increase the onload time of the entire page. However, assets downloaded using link preload will not affect the onload time.

Here are the all attributes you can use with the `<link rel="preload" />`

```jsx
<link
  /* 
    This rel attribute tells the browser that it's a link preload.
  */
  rel="preload"
  /* 
    In href, you need to give the relative/absolute path to the
    asset that needs to be preloaded.
    example: 
      href="/css/main.css"
      href="https://code.jquery.com/jquery-3.5.0.min.js"
  */
  href=""
  /* 
    `as` attribute tells the browser what kind of resource to
    be downloaded. The following values are applicable:
   audio | document | embed | fetch | font | image | object | script | style | track | worker | video 
  */
  as=""
  /* 
    Elements can accept a type attribute, which contains the MIME type of the resource the element points to.
    exmaple:
      type="font/woff2"
      type="video/mp4"
  */
  type=""
  /* 
    If you want to do crossorigin fetches, need to set this
  */
  crossorigin=""
  /* 
    Media attribute can accept media types of media queries
    Example:
      media="web"
      media="( max-width: 900px )"
  */
  media=""
/>
```
First, let's see how the assets in your HTML page affect the pageload. Here is an example HTML page with out any link preloading. It consist of stylesheet placed insidet the `head` element, another external script file and a local script file added inside the `body` element.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog page</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link rel="stylesheet" href="assets/basic.css">
</head>
<body>
  <header>
    <h1>My Blog Website</h1>
  </header>
  <main>
   ... content goes here
  </main>
  <footer>
    <div>Written by Shidhin CR</div>
    <div>
      <ul>
        <li>Contact</li>
        <li>Email</li>
        <li>About</li>
      </ul>
    </div>
  </footer>
  <script src="https://unpkg.com/dollar-dom@1.0.2/build/dollar-dom.min.js"></script>
  <script src="assets/basic.js" async></script>
</body>
</html>
```

Once the html file is loaded from the server, the browser start parsing the HTML.The browser does the asset discovery at this time. To know more about this whole process, I recommend you to read [how browsers work](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/). Once the browser find an asset, it will pause the parsing and start fetching the assets. After the asset is downloaded, the browser continues the parsing process.

With link preloading, the browser preload scanner will look for all the links that needs to be preloaded. This happens in parallel with parsing the HTML. Once the assets are loaded, they are cached in the browser cache.

Let's see this in action. I have created two html pages, one without any optimizations and other with link preload enabled. Let's see how both these pages perform. We can measure this by looking the difference in DomContentLoaded, onLoad, FirstPaint and First Contentful Paint. 

Check the first page here: [Without Link Preload](http://undefinednull.com/demos/link-preload/basic.html)

And the second page with link preload enabled: [With Link Preload](https://www.undefinednull.com/demos/link-preload/basic-with-preload.html)

---
__With out link preload__

![](/img/link-preload/without-preload.png)

---
__With link preload__

![](/img/link-preload/with-preload.png)

![](/img/link-preload/preload-request-starts.png)


## References

1. https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
2. https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
3. https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
4. https://developers.google.com/web/updates/2016/03/link-rel-preload
5. https://www.w3.org/TR/preload/

## Browser support

![](/img/link-preload/caniuse-preload.png)

https://caniuse.com/#feat=link-rel-preload


Thanks for reading. Please let me know if you have any comments by pressing the comment button below.