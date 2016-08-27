---
layout: post
title: "Implementing a curry function in JavaScript using TDD"
date: 2015-03-19 18:51:27 +0400
comments: true
categories:
- TDD
- JavaScript
- Testem
- Curry
---

TDD stands for Test Driven Development. To those who don't know what TDD means: In a typical TDD Environment, a developer start with a basic test case describing the minimal requirement for implementing the module. Then he writes the actual implementation code for making the test case pass.
<!--more-->
![TDD](https://lh3.googleusercontent.com/dtPfB5V-ew-rm3aApkXHTA8jFVwsFzoNNepbn9wU=w264-h207-p-no)

Next, another test case is written for a different expectation for the module, followed by writing the implementation to make the test pass. This process goes on till the all the expectations for the actual module is implemented.

This way of development ( driven by series of test cases ) is called TDD.

### Setting up the tools

Here we're going to use [Mocha](http://mochajs.org) as the unit testing framework. For running the tests, we will be using [Testem](https://github.com/airportyh/testem).

We'll be using BDD ( Behaviour Driven Development, which is similar to TDD, but instead of `assertions` we use `expectaions`) style syntax. For that purpose let's use the excellent [Chai.js](http://chaijs.com/) library.

First install Testem:

```sh
npm install -g testem
```
Now create a folder called `TDD` anywhere in your system. We're going to keep all our files in this folder.

```sh
mkdir TDD && cd TDD
```
Create the following files:

1. curry.js  ( The module we're going to implement )
2. curry-spec.js ( Test file for the curry.js )
3. testem.yml ( Testem configurations )

#### Testem Configuration
Edit the `testem.yml` and set up the source files for running the tests.

```yml
src_files:
- curry.js
- curry-spec.js
```
Open Terminal and run the command `testem` from the TDD folder to verify testem is running.

#### Mocha and Chai
As I said earlier, we're going to use **Mocha** and **Chai** for writing the test cases. By default, testem uses Jasmine as the testing framework. So to use Mocha and Chai, we need to change the testem configuration.

First install Chai.js from npm.

```sh
npm install chai
```

Open the `testem.yml` in editor and modify like below.

```yml
framework: mocha
src_files:
- node_modules/chai/chai.js
- curry.js
- curry-spec.js
```

We also need to override the global `expect` in Testem with the `expect` method of Chai.js

Create a `setup.js` file in TDD folder like below:

```js setup.js
var expect = chai.expect
```
To make sure that everything works fine, edit the **curry-spec.js** with the following code and run the `testem` command from terminal.

```js curry-spec.js
describe('Testem setup', function () {
    it('should verify the tests are passing', function(){
        expect(1).to.eq(1);
    })
});
```
Open the link in the terminal to start capture the browser and run the tests. Once the tests ran, you should be able to see an output like this:

```sh
TEST'EM 'SCRIPTS!
Open the URL below in a browser to connect.
http://localhost:7357/
━━━━━━━━━━━━━━┓
  Chrome 40.0 ┃
    1/1 ✔     ┃
              ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✔ 1 tests complete.
[Press ENTER to run tests; q to quit; p to pause]
```

## Thinking about Behaviours of the Module

Behaviour of the module is the output it produces for various inputs. Or we can say, how the module is responding to various scenarios. These scenarios are going to be our test cases. So, before we start writing our test cases, we should think about all possible scenarios the module can handle with.

### JavaScript Curry Function

Here we're going to implement a curry function in JavaScript. So in this case, the *module* or the *unit* is the function named `curry`. Let's think and start identifying different scenarios ( in this context, inputs ) for our `curry` function.

According to [Wikipedia](http://en.wikipedia.org/wiki/Currying), curry function is defined as:
>In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument (partial application).

So by definition, a function `add(a,b,c)` is a curried function if the `add` function supports following:

```js
add(1,2,3) // should return 6
add(1)(2)(3) // should return 6
add(1,2)(3) // should return 6
add(1)(2,3) // should return 6

var sumofTwoAndThree = add(1,2) // sumofTwoAndThree should be a function
sumofTwoAndThree(3) // should return 6
```

So, what we're going to implement now is a function that can create a curried function from any other function. We'll divide our test cases into two groups: one for curry function generator and another one for the actual curry function.

### Writing the first test case

Let's start with the curry function generator. We'll name it as `makeCurry`. Its behaviour is to transform any function into a curried function.

Edit the **curry-spec.js** and remove the test code we already added. Start with a new `describe` block. The **curry-spec.js** should be like this now:

```js curry-spec.js
describe('Curry function generator', function () {
    it('should return a function', function(){
        var add = function(){}
        expect(makeCurry(add)).to.be.a('function');
    });
});
```

Run the `testem` command ( if it's already running, you can see the following output in the browser captured )

```sh
ReferenceError: makeCurry is not defined
    at Context.<anonymous> (http://localhost:7357/curry-spec.js:4:16)
    at callFn (http://localhost:7357/testem/mocha.js:4338:21)
    at Test.Runnable.run (http://localhost:7357/testem/mocha.js:4331:7)
    at Runner.runTest (http://localhost:7357/testem/mocha.js:4728:10)
    at http://localhost:7357/testem/mocha.js:4806:12
    at next (http://localhost:7357/testem/mocha.js:4653:14)
    at http://localhost:7357/testem/mocha.js:4663:7
    at next (http://localhost:7357/testem/mocha.js:4601:23)
    at http://localhost:7357/testem/mocha.js:4630:5
    at timeslice (http://localhost:7357/testem/mocha.js:5761:27)
```
We can see that the test is failing. The whole TDD starts from a failing test, and by making it pass. So why waiting, let's implement the `makeCurry` function inside the **curry.js** file.

```js curry.js
var makeCurry = function(){

};
```
Now in the testem window, we can see another failure:

```sh
AssertionError: expected undefined to be a function
```
Modify the `makeCurry` function to return a dummy function as its output.

```js curry.js
var makeCurry = function(){
    return function(){};
};
```
Our first test should pass now. By far, we have implemented the test case for the simple `makeCurry` function and implemented the `makeCurry` function.

This is how the TDD works. In the next section, we'll see how the whole unit implementation is evolved in series of test cases and the code to make them pass.

## Evolving the Final Code

For now, we have only one test case for the `makeCurry` function. Let's think about different scenarios for our curry function.

1. Our curry function should always accept one function as parameter, if there is no function provided, it should throw an error.

Add the another test case inside the `curry-spec.js`

```js curry-spec.js
describe('Curry function generator', function () {
    it('should return a function', function(){
        var add = function(){}
        expect(makeCurry(add)).to.be.a('function');
    });

    it('should throw an error if there is no valid function provided as argument', function(){
        expect(function(){
            makeCurry();
        }).to.throw('No function provided');
    });
});
```
Now we can see that our test case is failing:

```sh
AssertionError: expected [Function] to throw an error
```
This is because we haven't added the code in our `makeCurry` function to validate the arguments for it. Let's implement this functionality now:

```js curry.js
var makeCurry = function(fn){
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }
    return function(){};
};
```
Now we're getting into the rhythm of TDD. For now, we're done with the expectations for the `makeCurry` function. Let's implement the real `curry` function logic.

We are going to add a new describe block for the expectations for curry function. Here, the curry function is the one `makeCurry` returns. I am going to list down all the expectations for the `curry` function here. We'll take one by one from the list and add to the test and implement the logic.

**Expectations for the curry function**:

- We should be able to call the curried function as the original function provided. Ie, if the original function is `add(1,2,3)` the curried function `curriedAdd(1,2,3)` should behave same as `add` function. Like this:

```js
	var add = function(a,b,c){
		return a+b+c;
	}
	var curriedAdd = makeCurry( add );
	curriedAdd(1,2,3) // should return 6.
```
- If we call the curried function with the lesser number of arguments, it should return a function

```js
curriedAdd(1) // should return a function
curriedAdd(1,2) // should return a function
```
- When the total number or arguments is equal to or greater than the original number of arguments, it should return the results

```js
curriedAdd(1)(2)(3) // should return 6
curriedAdd(1,2)(3) // should return 6
curriedAdd(1)(2,3) // should return 6
curriedAdd(1,2)(3,4,5,6) // should return 6
```
- We should be able to make any number of independent curried functions using `makeCurry` function.

```js
var add = function(a,b,c){
	return a+b+c;
};
var curryA = makeCurry(add);
var curryB = makeCurry(add);

curryA(1,2)(3) // return 6
curryB(1)(2)(3) // return 6
```

We came up with all the test scenarios for our curry function. Let's pick one by one and implement the logic. Add the first test case inside the new `describe` block.

```js curry-spec.js
describe('Curry function generator', function () {
    it('should return a function', function(){
        var add = function(){}
        expect(makeCurry(add)).to.be.a('function');
    });

    it('should throw an error if there is no valid function provided as argument', function(){
        expect(function(){
            makeCurry();
        }).to.throw('No function provided');
    });
});

describe('Curry function', function(){
    var add;

    beforeEach(function(){
        add = function(a,b,c){
            return a + b + c;
        };
    });

    it('should return the proper result if called with original number of arguments',function(){
        var curriedAdd = makeCurry( add );
        expect( curriedAdd(1,2,3) ).to.eq(6);
    });

});
```
Testem output should be like this:

```sh
Curry function should return the proper result if called with original number of arguments
    ✘ expected undefined to equal 6
        AssertionError: expected undefined to equal 6
            at Context.<anonymous> (http://localhost:7357/curry-spec.js:25:40)
            at callFn (http://localhost:7357/testem/mocha.js:4338:21)
            at Test.Runnable.run (http://localhost:7357/testem/mocha.js:4331:7)
            at Runner.runTest (http://localhost:7357/testem/mocha.js:4728:10)
            at http://localhost:7357/testem/mocha.js:4806:12
            at next (http://localhost:7357/testem/mocha.js:4653:14)
            at http://localhost:7357/testem/mocha.js:4663:7
            at next (http://localhost:7357/testem/mocha.js:4601:23)
            at http://localhost:7357/testem/mocha.js:4625:7
            at done (http://localhost:7357/testem/mocha.js:4300:5)
```

Let's make the test pass by adding the implementation:

```js curry.js
var makeCurry = function(fn){
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }

    var slice = [].slice;
    return function curriedFn(){
      var args = slice.call(arguments);
      return fn.apply(null, args);
    };
};
```
Okay now, tests are passing. Let's add the next test case inside the "Curry function" describe block:

```js
it('should return a function when arguments count is less than the original number of arguments', function(){
    var curriedAdd = makeCurry( add );
    expect( curriedAdd(1,2) ).to.be.a('function');
});
```

Tests are failing now. Time to make them pass.

Now we need to verify that the number of arguments passed is less than the original number of arguments. If it lesser, the tests are expecting a function to be returned ( than executing the original function ). Let's implement this:

```js curry.js
var makeCurry = function(fn){
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }

    var slice = [].slice;
    return function curriedFn(){
      var args = slice.call(arguments);

      if(args.length < fn.length){
        return curriedFn;
      }

      return fn.apply(null, args);
    };
};
```

All the tests are passing now. Let's pick the next test case.

```js
it('should return the result whenever the total number of arguments is greater than or equal to the original number of arguments', function(){
    var curriedAdd = makeCurry( add );
    expect( curriedAdd(1)(2) ).to.be.a('function');
    expect( curriedAdd(1)(2)(3) ).to.eq(6);
    expect( curriedAdd(1,2)(3) ).to.eq(6);
    expect( curriedAdd(1)(2,3) ).to.eq(6);
    expect( curriedAdd(1,2)(3,4,5,6,7) ).to.eq(6);
});
```

And the implementation:

```js curry.js

var makeCurry = function(fn){
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }

    var slice = [].slice;
    return function curriedFn(){
      var args = slice.call(arguments);

      if(args.length < fn.length){
        return function(){
          return curriedFn.apply(null, args.concat( slice.call(arguments) ));
        };
      }

      return fn.apply(null, args);
    };
};
```

Now, we're going to add our last test case.

```js
it('should support creating multple curry functions', function(){
    var curryA = makeCurry(add);
    var curryB = makeCurry(add);

    expect( curryA(1,2)(3) ).to.eq(6);
    expect( curryA(1,2) ).to.be.a('function');

    expect( curryB(1)(2)(3) ).to.eq(6);
    expect( curryB(1)(2) ).to.be.a('function');
});
```

And this time, Testem reports that all tests are passing. Voila!, it means we're done with our curry function implementation.

## Final code

Here is the final code for **curry-spec.js** and the **curry.js**.

```js curry-spec.js
describe('Curry function generator', function () {
    it('should return a function', function(){
        var add = function(){}
        expect(makeCurry(add)).to.be.a('function');
    });

    it('should throw an error if there is no valid function provided as argument', function(){
        expect(function(){
            makeCurry();
        }).to.throw('No function provided');
    });
});

describe('Curry function', function(){
    var add;

    beforeEach(function(){
        add = function(a,b,c){
            return a + b + c;
        };
    });

    it('should return the proper result if called with original number of arguments',function(){
        var curriedAdd = makeCurry( add );
        expect( curriedAdd(1,2,3) ).to.eq(6);
    });

    it('should return the curried function when arguments count is less than the original number of arguments', function(){
        var curriedAdd = makeCurry( add );
        expect( curriedAdd(1,2) ).to.be.a('function');
    });

    it('should return the result whenever the total number of arguments is greater than or equal to the original number of arguments', function(){
        var curriedAdd = makeCurry( add );
        expect( curriedAdd(1)(2) ).to.be.a('function');
        expect( curriedAdd(1)(2)(3) ).to.eq(6);
        expect( curriedAdd(1,2)(3) ).to.eq(6);
        expect( curriedAdd(1)(2,3) ).to.eq(6);
        expect( curriedAdd(1,2)(3,4,5,6,7) ).to.eq(6);
    });

    it('should support creating multple curry functions', function(){
        var curryA = makeCurry(add);
        var curryB = makeCurry(add);

        expect( curryA(1,2)(3) ).to.eq(6);
        expect( curryA(1,2) ).to.be.a('function');

        expect( curryB(1)(2)(3) ).to.eq(6);
        expect( curryB(1)(2) ).to.be.a('function');
    });

});
```

```js curry.js

var makeCurry = function(fn){
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }

    var slice = [].slice;
    return function curriedFn(){
      var args = slice.call(arguments);
      if(args.length < fn.length){
        return function(){
          return curriedFn.apply(null, args.concat( slice.call(arguments) ));
        };
      }

      return fn.apply(null, args);
    };
};
```

## Summary

I wouldn't say TDD is nice and simple. Writing all the code in TDD way is tough and frustrating for beginners. But if you keep practicing TDD, eventually you are going to love it. TDD will help you to concentrate on a small part of your code and complete it with perfection. Finally, that will lead to implement a better design for your actual module. So my point is, TDD is useful for better architecture of your code and the code will be less error prone.

Thanks for reading. I hope this will help for implementing TDD for your next project. Feedbacks are welcome.
