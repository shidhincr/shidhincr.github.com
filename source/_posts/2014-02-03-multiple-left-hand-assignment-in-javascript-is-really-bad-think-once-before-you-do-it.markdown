---
layout: post
title: "Multiple Left-hand assignment in JavaScript, is really bad. Think once before you do it."
date: 2014-02-03 12:04
comments: true
author: Shidhin
published: true
categories: 
- JavaScript
---

**“JavaScript allows multiple left-hand assignments”**

You may ask, what does that mean ? Well, if you’re not familiar, in JavaScript you can write the variable assignment expressions like this.

```javascript

var a = b = c = d = 10;

```

The assignment expressions are always evaluated from right-to-left. So what the above expression actually does is, assign the value `10` to the variable `b`, then assign the value of `b` to `c` and so on. <!--more-->Finally all the variables will get the value `10`. This kind of "short-hand" code will allows you to get rid of the repetitive code; especially when you want to initialise multiple variables with an initial value.

### And what’s the catch here ?

Well, in simple words: **“the scope“**  . To understand that, let’s move the same expression inside a function. Like this:

```javascript

function foo (){
   var a = b = c = d = 10;
}

```

If you expect all of these variables are having a scope local to the function `foo`, then you’re wrong. What happens here is, the var statement is only applicable to the variable `a`. And all the other variables are considered with out the `var` statement, hence will be the global. Try executing foo method, you would see:

```javascript

foo();

window.a // undefined
window.b // will be 10
window.c // will be 10
window.d // will be 10 

```

Yes, that’s the catch ! So avoid multiple left-hand assignments inside any functions. If you’re writing this in global level ( you’re assuming all of your variables to go in global scope ), then this is not at all an issue. So better watch our next time before you do this.

### Final note

If  you're not convinced and still want to do left-hand assignments, then the right way of doing it is like this:

```javascript
function foo() {
  var a,b,c,d;
  a = b = c = d = 10;
}
```

Declaring all the variables in the first line is **one of the good coding style**. This will make sure that you’re not the victim of scope issues and hoisting problems.  So always read about the JavaScript best practices, and adhere to good coding style. 


