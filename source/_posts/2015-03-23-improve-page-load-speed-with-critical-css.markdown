---
layout: post
title: "Improve Page Load Speed With Critical CSS"
date: 2015-03-23 06:38:57 +0400
comments: true
published: true
categories: 
- critical css
- nginx
- nodejs
---

Performance is one of the important area developers are focusing these days. Even Google added page load speed as one of the key parameter of their ranking algorithm. So if websites need to optimise their page load performance along with other search engine optimisations. 



According to Amazon's study with page speed improvements:

> For every 1 second of improvement they experienced up to a 2% increase in conversions. For every 100 ms of improvement, they grew incremental revenue by up to 1%

## Improving page load time

Browser spend most of the time for downloading the resources. If the resources ( JS, CSS ) are inside the `HEAD` tag, browser has to download all of them before parsing the HTML. Therefore, users won't be able to see anything on the screen till all the resources are downloaded.

We can fix the HTML parsing problem by moving these resources to the bottom of the page; Near the ending `BODY` tag. We can apply the JavaScript lazy loading techniques to load the resources after the DOM is completely parsed and interactive. However, if we move any stylesheets from HEAD tag ( or lazyload stylesheets ), it will lead to a terrible user experience problem called **FOUC**. 

## FOUC  ( Flash of Unstyled Content )

FOUC is the abbreviation for Flash of Unstyled Content.  A FOUC can occur when the browser is already parsed the DOM, then later apply the stylesheet.  The user will see completely unstyled content till the stylesheet get downloaded and applied. That is why including stylesheets in the `HEAD` tag considered to be a best practice. Because, browser has to download and apply all the resources before parsing the DOM. 

Including the stylesheets in the `HEAD` is a best practice for good user experience. However, it affect the page load performance in the other way. Since the browser has to download all the resources in the `HEAD` tag before any parsing, the page load time increases accordingly. This particular problem existed for years without any solution and now, we have a solution: it's known as **Critical Css**.

## Critical Css

Before move on to the Critical Css, we need to understand what is an **Above the fold content**. Because, it plays an important role about Critical Css. The **Above the fold content** is first mark-up user sees in the browser with out doing any scrolling; and this markup varies between device to device. **Above the fold content**, completely depends on the device's ( or browser's ) height and width.

Critical Css is the minimum css rules required for displaying the "**Above the fold content**" with out showing any FOUC to the users. Critical Css is also calculated page by page as the **Above the fold content** for different pages will be different. Once the Critical Css is generated for any page ( We'll discuss how to do it in the next section ), it will be embedded in the `HEAD` tag as inline styles. The original CSS files will be then lazy loaded. This will have a hugh performance impact, as there is no need to wait for the CSS files to get downloaded before DOM parsing, and there is no FOUC.

## Generating Critical Css

We cannot generate the Critical Css required for each page manually. There are lot of tools available for generating the Critical Css ( some of them are limited to NodeJS applications ). Here in this section, we'll see how to use those tools to generate Critical Css for our applications/websites.

#### NodeJS tools:

There are different npm modules available. Choose any of them based on your convenience.

1. [Critical](https://www.npmjs.com/package/critical) ( From Addy Osmani )
2. [Penthouse](https://www.npmjs.com/package/penthouse)
3. [CriticalCSS](https://github.com/filamentgroup/criticalCSS) ( From Filament group )
4. [Critical-CSS](https://www.npmjs.com/package/critical-css)

All we need to do is specifying the general height and width -- as the tools need to calculate the ideal "**Above the fold content**" size.  It's better to check your analytics dashboard and come up with above the fold size ( height and width ) that can cover most of the devices. 

These tools are great for creating the Critical Css. However, they won't be good for creating Critical Css on the fly. To generate Critical Css in run time, there're some server modules available for Apache and Nginx. Let's check them out now.

#### Apache and Nginx modules

Google has released their pagespeed modules for both Apache and Nginx. See the links below:

1. [Pagespeed module Apache](http://modpagespeed.com/)
2. [Pagespeed module Nginx](http://ngxpagespeed.com/)

Pagespeed module is a set of filters written in C++, and critical-css is one among them. These filters dynamically transform the response from the server based on the configurations. More about nginx pagespeed critical css filter here:

[Prioritze Critical CSS Nginx](https://developers.google.com/speed/pagespeed/module/filter-prioritize-critical-css)

It should be fairly easy to configure the pagespeed module. However, if you are using CDN for serving your assets, you might need to add these filters in your configuration:

```sh
pagespeed InlineResourcesWithoutExplicitAuthorization
pagespeed MapProxyDomain
```

If you use Docker, there is a good news for you. Here in Namshi, we open-sourced a docker container running nginx with pagespeed module. Checkout below link and read the documentation:

[Docker Node Nginx Pagespeed](https://github.com/namshi/docker-node-nginx-pagespeed)

## Summary

Using critical css will boost the page load performance drastically. Critical css will help you to obtain a better page rank in google pagespeed insights tool. Here in Namshi, we have achieved a better page rank using critical css combining with other best practices for page load improvements.	  	
