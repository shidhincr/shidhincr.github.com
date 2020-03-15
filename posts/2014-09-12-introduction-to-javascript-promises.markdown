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

- Promises are available in Javascript
    + Available in Chrome as of now
    + One of the best feature of ES6
    + I am going to explain promises with the native Promises

- What are Promises
    + They are placeholders for a future value
    + They have different states
    + State transitions are possible once

- Why we need Promises
    + Our brain wants to think in a synchronous way
    + Callback hell
    + Return values and error catching

- Deferreds and Thenables
    + Deferreds are used for resolving the promise
    + There is no need for a deferred in native promise as it's replaced with a function ( which has resolve, reject parameters )
    + Thenables has then function

- Analyse the native Promise object
    + How to create a new Promise
    + Default Promise state and Promise value
    + You can only resolve one value from the promise
    + Promise will be always async even called after the promise is resolved.

- Summary
    + Promises are very powerful
    + Promises with generators will be kickass couple.
    + More browsers will start supporting the native  Promise object
    + Use Promises in your code.








































----------------------------------------------------------------------
Promise is the new born kid in JavaScript world. Even though it's new to JavaScript, it existed in computer science already. According to this wikipedia [link](http://en.wikipedia.org/wiki/Futures_and_promises), 

>The term promise was proposed in 1976 by Daniel P. Friedman and David Wise,[1] and Peter Hibbard called it eventual.[2] A somewhat similar concept future was introduced in 1977 in a paper by Henry Baker and Carl Hewitt.[3]

Here in this post, we'll see the basics of promises and why they are useful.

<!--more-->
## Synchronous and Asynchronous Code

- Developers like to write synchronous code as It won't change the flow of execution. It's easy to read and debug. Always have a return after successful completion or error out for an unsuccessful program execution.
- Meanwhile, Async code improves program performance. It's not blocking other part of the code. But, lack of return values and proper exceptions handling.
- Async code gives better user experience. As a user, I don't need to wait for a long operation to be done.. But control flow is a mess for the developers
- Callback: the function used for handling the async code: explain this
- Examples of synchronous and asynchronous code

Flow of control ( or control flow ) is one of the fundamental steps programmers learn first. Flow of control is the order in which each statement in our code gets executed. Knowing the flow of control will help in easy debugging the code and catch early bugs. 

**Synchronous ( Blocking ) code :**

In synchronous code, the control flow is always in sequential order. This means, the compiler/interpreter will go to the next statement only after completing the current statement execution. Usually, developers tends to write synchronous code most of the times; As it's easy to read the code and debug. 

Also, in synchronous code, every statement **may** have a return value after successful completion, or can throw an error for unsuccessful execution. This is very important, as one program statement might need to get value from previous statement to do some operations. If the previous statement error out, the next statement can catch it properly and do the appropriate actions. See the below example:

```javascript
// get a random userId from an array

function getUserId(){
	var users = ['user1','user2', 'user3', 'user4', 'user5'];
	return users[ Math.floor(Math.random()*5) ];
}
function showRandomUser(userId){
	alert('The random user id is : '+ userId);
}

var randomUser;
try{
    randomUser = getUserId();
    showRandomUser(randomUser);	
}
catch(e){
	alert('error');
}

```

The above code is completely synchronous. It first gets the random `userId` by executing a function, and assigns to a variable. This variable then passed to another function which displays it. There is even a try catch block in place, so that if any error occur in these lines will be caught and shows an alert. 

Good thing for the above code is, each and every line is understandable. We know what happens in each line, and what's going to happen next. That's the beauty of synchronous code. 

However, there are situations which should not be handled in synchronous code. Example, assume we are getting the userId from the server instead from an array. If the code is synchronous ( also know as blocking code ), we need to wait till it fetches the details from server. That's why it's also knows as blocking code, as it blocks the interpreter/compiler from executing any other statements.

**Asynchronous ( Unblocking ) code :**

Asynchronous code doesn't block. ...

It uses callbacks to execute the code after the asynchronous event. ...

Control flow is a mess; developer need to know when the code is going to be executed. ...

No return statements, and catching error is difficult. ...

In simple words, **Asynchronous code** doesn't block the program execution.  It uses another mechanism, knows as a `callback` function to switch the control flow once the async operation is completed. 

## Callback Hell ( or Callback pyramid )

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

If you know the power of promises, you never go to callback hell. Now that ES6 have native implementation for promises. I would suggest to start writing your promises now itself; because, you might find it difficult for the first few times, but learning it will completely change your coding style. 

Thanks for reading !!!