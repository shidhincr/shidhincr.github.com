---
layout: post
title: "Using Call and Apply in JavaScript. When any Why ?"
date: 2014-01-30 12:23
comments: true
author: Shidhin
published: false
categories: 
---

##This is heading

1. Introduction
2. What's Call and Apply 
3. The scope inside any function. The `this` operator.
4. How to change the `this` value inside any function
5. Conclusion


`Call` and `Apply` are two most powerful feature of JavaScript. These are two ways of invoking functions. Functions are also objects, but the main difference is the existence of the callable property.

Before we start, let's find out how the scope is decided inside any function.

```javascript
var call = function(){
	alert(this);
}
```
this is some block code	 for showing and 