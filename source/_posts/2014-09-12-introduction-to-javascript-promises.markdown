---
layout: post
title: "Introduction to JavaScript Promises"
date: 2014-09-12 07:03:43 +0400
comments: true
published: false
categories: 
- JavaScript
- Promises

---
![](/images/promises.jpg)

Promise is the new kid in JavaScript world. Even though it's new in JavaScript, it existed in computer science since long time. According to this wikipedia [link](http://en.wikipedia.org/wiki/Futures_and_promises), 

>The term promise was proposed in 1976 by Daniel P. Friedman and David Wise,[1] and Peter Hibbard called it eventual.[2] A somewhat similar concept future was introduced in 1977 in a paper by Henry Baker and Carl Hewitt.[3]

Here in this post, we'll see the basics of promises and why they are useful.


## Synchronous and Asynchronous Code

- Developers like to write synchronous code as It won't change the flow of execution. It's easy to read and debug. Always have a return after successful completion or error out for an unsuccessful program execution.
- Meanwhile, Async code improves program performance. It's not blocking other part of the code. But, lack of return values and proper exceptions handling.
- Async code gives better user experience. As a user, I don't need to wait for a long operation to be done.. But control flow is a mess for the developers
- Callback: the function used for handling the async code: explain this
- Examples of synchronous and asynchronous code

## Callback Hell

- As developers started relying more and more on callbacks, it becomes more difficult to read and debug the code. Exception handling is zero, as we don't know in which callback the error occurred. In that case we need to have code to handle exceptions in each and every callbacks. against the DRY principles
- Example of a callback hell

## Solution: Promises

- Promises = synchronous +  asynchronous
- Synchronous code to read and debug , but asynchronous in operation.
- Power of asynchronous code, and beauty and flexibility of synchronous code
- Proper error handling and return values
- Promise states
- Can be resolved with a value or rejected with a reason.
- Simple API: explain then, catch, fail, done
- Examples

## Deferred

- Learn and explain about this here.

## Promises in real world

- To understand promises, use its literal meaning. Consider a real world situation like this:
- I need something, I'll ask my friend, he will ask his friend .. and go on
- More about chaining promises, different promise APIs, different promise implementations in javascript, will explain in the next part 2.

## Conclusion

Promises are one of the promising thing in JavaScript. ES6 supports promises natively. Promises were every developers dream thingy. You might find difficult at first time, but learning it will completely change your coding style. It's that powerful ..