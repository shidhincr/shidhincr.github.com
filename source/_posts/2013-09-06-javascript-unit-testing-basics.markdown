---
layout: post
title: "Javascript Unit Testing Basics and TDD - Test Driven Development"
date: 2013-09-06 15:02
comments: true
author: Shidhin
categories: 
- javascript
- unit testing
- busterjs
---

## TDD - Test Driven Development ##

TDD is a typical software development style where, first the test will be written for any unit( function/module ) then the actual code. Initially all the tests for the 
particular unit will start failing. Now the developer has to write the unit code to make each test pass. This is how developer will be designing a better, testable code for any unit.

## Which framework to choose ? ##


There're many for JS unit testing. Naming few here : 

- QUnit
- JsTestDriver
- Jasmine
- Mocha
- BusterJS
- PhantomJS

The list goes like this ..

It doesn't matter which framework you choose. Few caveats you need to consider when you need to test any unit which has async executing code involved. At that time, you need to check the chosen framework supports asynchronous testing or not.

I'm going to use `BusterJS` here for the example described below. Check the `BusterJS` website to know how to install it in your system.

<!-- more -->

## Example ##


**What we're going to build :**

We need to build an expandable module which has the following API

- It should've a method `expand()`
- It should've a method `collapse`
- It should've a method `toggle`

## Defining our tests ##

In our test/testSuite ( testSuite is a collection of tests ) , we need to write tests that will satisfy the functional criterias. For example : Our first criterias should be

- Once initialized,  the module should be an object ( should not be undefined ).
- The module should've all methods defined as per it's API

Wriring these tests in BusterJS is very simple. Buster uses the assertion framework internally ( expect.js ) which is more like writing in natural language.

First we need to define our test's name.We use the `describe` method buster provides. Before using `describe` method we've to expose these methods to public. This is because , Buster encapsulates all these methods in it's namespace –– and if we need to avoid calling such a long namespace, we need to expose these methods to global scope. For that we use the following code
	
	buster.spec.expose()

`spec` is same as `test` rather it's a BDD syntax . I need to explain what BDD is , and that I'll cover later.

## Files ##

I've created a file named ` expandable.test.js ` in the ` TDD\tests ` folder. Also the actual unit code goes to another file ` expandable.js ` which is there in ` TDD\lib ` folder.

To tell Buster to pick these files and run , we need to create another configuration file called `buster.js` –– It's pretty much self explanatory when you see the configuration code. I've given below for reference : 

```javascript	
	var config = module.exports;
	config["expandableModule"] = {
	    rootPath: "../",
	    environment: "browser", // or "node"
	    sources: [
	        "lib/expandable.js"
	    ],
	    tests: [
	        "tests/expandable.test.js"
	    ]
	}
```


## So our first testcase ##

```javascript	
	describe("expandable module test" , function() {
		before(function(){
			this.expandable = module("expandable");
		});
		it("should be an object when initialized and should've all the api defined", function(){
			expect( this.expandable ).toBeDefined().toBeObject();
			expect( this.expandable.expand ).toBeFunction(); 
			expect( this.expandable.collapse ).toBeFunction(); 
			expect( this.expandable.toggle ).toBeFunction(); 
		});
	});
```

The `before` function will get executed before each `it` function handler executes. We can utilise this one for resetting any values which already set , and will affect our tests.

Naviagate to this directory in terminal and execute the buster command to start capturing browser slave. This step is required if we choose the running environment as browser. So buster will be running all the code in the browser slave we capture. ( the other option is to directly run in node environment )

So start capturing browser
	
	buster server

This will output something similar like this
	
	buster-server running on http://localhost:1111

Open up any browser ( I usually use Chrome ), and load the above url. Once it's opened , click on the capture browser to get our first browser slave.

Let's not try anything in the console , since we don't need to interrupt the running Buster server. Open a new tab in the console and run the following command.
	
	buster test

This will now pick the `buster.js` configuration and start executing tests one by one. We can see the test output in the console now.

*By this time our first test should be failing* –––– Yes , it's **FAILING**. The output is like this :

	Chrome 28.0.1500.95, Mac OS X 10.7.5: F                                                                                
	Failure: Chrome 28.0.1500.95, Mac OS X 10.7.5 expandable module test should be an object when initialized and should've all the api defined
	    [expect.toBeDefined] Expected to be defined
	    at Object.<anonymous> (./tests/expandable.test.js:9:29)

	1 test case, 1 test, 1 assertion, 1 failure, 0 errors, 0 timeouts
	Finished in 0.015s

So we can now assume that all our buster configurations are correct. We can add more test cases to the `expandable.test.js` now ( Ideally we should be writing all the test cases first and then only writing actual implementation of the unit ). But , this is just for learning purpose , I'm going to write the implemenation for the `expandable` module.

**`expandable.js`** code :

```javascript
	module.create("expandable", {});
```

Re-run the command `buster test` and we can see that our first expect statement is passing. Console output should be pointing to the failure of next assertion statement :

	Chrome 28.0.1500.95, Mac OS X 10.7.5: F                                                                                
	Failure: Chrome 28.0.1500.95, Mac OS X 10.7.5 expandable module test should be an object when initialized and should've all the api defined
	    [expect.toBeFunction] undefined (undefined) expected to be function
	    at Object.<anonymous> (./tests/expandable.test.js:10:36)

	1 test case, 1 test, 2 assertions, 1 failure, 0 errors, 0 timeouts
	Finished in 0.014s

That's cool ! Let's make the entire test pass by defining the api in the expandable object.


**`expandable.js`** code : 

```javascript
	module.create("expandable", {
		"expand" : function() {},
		"collapse": function() {},
		"toggle": function() {}
	});
```

Run the buster test command again. Now we can see some green text in the console –– Yes, It's **PASSING** now : 
	
	Chrome 28.0.1500.95, Mac OS X 10.7.5: .                                                                                
	1 test case, 1 test, 4 assertions, 0 failures, 0 errors, 0 timeouts
	Finished in 0.009s

## Further test cases : Designing the entire expandable module ##

It's time to write the testcases for each API methods. Let's begin !

Let's assume that our expandable will have a property called `expanded` which will be `true` when expanded and will be `false` when collapsed. We need to make this one work in the initial implementation. We'll add the DOM interaction tests and implementation in the second phase.

So our tests will be something like this

**`expandable.test.js`** code : 

```javascript	
	buster.spec.expose();
	describe("expandable module test" , function() {
		before(function(){
			this.expandable = module("expandable");
		});
		it("should be an object when initialized and should've all the api defined", function(){
			expect( this.expandable ).toBeObject();
			expect( this.expandable.expand ).toBeFunction(); 
			expect( this.expandable.collapse ).toBeFunction(); 
			expect( this.expandable.toggle ).toBeFunction(); 
		});
		it("should be able to expand", function(){
			expect( this.expandable.expanded ).toBeFalse();
			this.expandable.expand();
			expect( this.expandable.expanded ).toBeTrue();
		});
		it("should be able to collapse", function(){
			this.expandable.expand();
			expect( this.expandable.expanded ).toBeTrue();
			this.expandable.collapse();
			expect( this.expandable.expanded ).toBeFalse();
		});
		it("should be able to toggle", function(){
			this.expandable.collapse();
			expect( this.expandable.expanded ).toBeFalse();
			this.expandable.toggle();
			expect( this.expandable.expanded ).toBeTrue();
			this.expandable.toggle();
			expect( this.expandable.expanded ).toBeFalse();
		});
	});
```
I hope the code is self explanatory. Let's implement each method.

**`expandable.js`** code : 
	
```javascript
	module.create("expandable", {
		expanded: false,
		"expand" : function() {
			this.expanded = true;
		},
		"collapse": function() {
			this.expanded = false;
		},
		"toggle": function() {
			(!!this.expanded) ? this.collapse() : this.expand();
		}
	});
```
## How about units involving DOM manipulation ? ##

This is a real world scenario. I would like to cover that in another article or may be I'll update here itself when I gets time.
	








