---
layout: post
title: "Implementing a Curry function with TDD (Test Driven Development ) : JavaScript "
date: 2013-10-04 18:04
comments: true
author: Shidhin
published: false
categories: 
- JavaScript
- TDD
- Currying
- Functional programming
---

## Points

- Functional Programming
	- Function Currying
- TDD
	- Why ?
- Mathematical explanation of Curry function
- How it should work in JavaScript
- Application of Currying
- Writing the tests
- Writing the Code
- Final,Conclusion
-----

## Function Currying

JavaScript is a very dynamic language which offers functional programming and object oriented programming styles. Here we'll talk about one {feature} of functional programming –– known as "Function Currying". In mathematical world, [Currying](http://en.wikipedia.org/wiki/Currying) is {defined} as :

> In mathematics and computer science, currying is the technique of transforming a function that takes multiple arguments (or a tuple of arguments) in such a way that it can be called as a chain of functions, each with a single argument (partial application).

So technically, a function is said to be a currying function when it satisfy the following:

```
fn(a,b,c,d,e,f) = fn(a)(b)(c)(d)(e)(f)
```

Similarly, there is another term called **"Partial functions"**. A partial function is a {different form} of curried function in which it can be {written} in any of the following form.

```
fn(a,b,c,d,e,f) = fn(a,b)(c,d)(e,f) = fn(a,b,c)(d,e,f) = fn(a,b)(c)(d)(e,f) 
```

**Real World Example**

From one of the stackoverflow [link](http://stackoverflow.com/questions/1352855/in-functional-programming-what-is-currying)

>Suppose you have a function that calculates the gravitational force acting on an object. If you don't know the formula, you can find it here. This function takes in the three necessary parameters as arguments.

>Now, being on the earth, you only want to calculate forces for objects on this planet. In a functional language, you could pass in the mass of the earth to the function and then partially evaluate it. What you'd get back is another function that takes only two arguments and calculates the gravitational force of objects on earth. This is called currying


## TDD





Links
---

1. http://blogs.msdn.com/wesdyer/archive/2007/01/29/currying-and-partial-function-application.aspx










