---
layout: post
title: "Implementing a curry function in JavaScript using TDD"
date: 2015-03-19 18:51:27 +0400
comments: true
published: false
categories: 
- TDD
- JavaScript
- Testem
---

- TDD and setup
    + What is TDD and why it is useful
    + Setting up the tools
    + Testem, Mocha and Chai

TDD stands for Test Driven Development. In a typical TDD Environment, the developer start with a basic test case describing the minimal requirement for implementing the module. Then the actual implementation code is written for making the test case pass. 

Next, another test case is written for a different expectation for the module, and then write the implementation to make the test pass again. This process goes on till the all the expectations for the actual module is implemented.

### Setting up the tools

Here we're going to use [Mocha](http://mochajs.org) as the unit testing framework. For running the tests, we will be using [Testem](https://github.com/airportyh/testem).
<!--more-->
We'll be using BDD ( Behaviour Driven Development ) style expectations. For that purpose let's use the excellent [Chai.js](http://chaijs.com/) library.

First install Testem:

```sh
npm install -g testem
```
Now create a folder called `TDD` any where in your system. We're going to keep all our files in this folder.

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
Open Terminal and run the command `testem` from the TDD folder to verify that testem is running properly.

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

We also need to change the global `expect` in Testem to use built in `expect` method of Chai.js

Create a `setup.js` file in TDD folder like below:

```js setup.js
var expect = chai.expect
```
- Thinking about behaviors
    + What is the behavior ?
    + JavaScript Curry function   
    + Writing the first test case
    + It will fail first and make it pass
    + Think about
- Evolve the code 
    + Adding more test cases
    + Make them pass one by one
- Final code   
- Summary
    + TDD is tough in the beginning
    + Once we get used to it, it's the best     approach for software design.
    + Happy TDD  
    
