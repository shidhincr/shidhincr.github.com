---
layout: post
title: "A brief walk-through of the ng-options in AngularJS"
date: 2014-08-11 11:13:45 +0400
comments: true
published: false
categories: 
- AngularJS
- ng-options

---

I don't know how many times I banged my head whenever I had to use `ng-options` in my code. Every time, I had to google around the syntax and tried to understand what it actually does. To be frank, AngularJS documentation for ng-options is less informative and baffling. Even though there're couple of stack-overflow links about ng-options, I decided to write a detailed post. This post, will be more useful to me than any others, as I don't need to google it next time when I use `ng-options`.

## Why ng-options

1. Normal way of generating options elements using ng-repeat 
2. Problems of using ng-repeat in an option element
3. Why ng-options are introduced

The simple way of generating the select menu items in Angular would be using ng-repeat. Look at the code below:

```html
{%raw%}
<html ng-app="app">
  <body>
    <div ng-controller="Test">
    	<p>selected item is : {{selectedItem}}</p>
      <select ng-model="selectedItem">
        <option ng-repeat="item in items" value="{{item}}">{{item}}</option>
      </select>
    </div>
  </body>
</html>
{%endraw%}
```
And the JavaScript:

```javascript
var app = angular.module('app',[]);
app.controller('Test',function($scope){
   $scope.items = ['one','two','three','four']
});
```
	
This works well when the items consists of plain strings. But what if we have an array of objects instead of plain text ?

The AngularJS documentation for select element says to use ng-options instead of ng-repeat in this kind of scenario. That's because, the option element can hold only string values at present.

Quoted from AngularJS documentation:
> Note: ngOptions provides an iterator facility for the '`option`' element which should be used instead of ngRepeat when you want the select model to be bound to a non-string value. This is because an option element can only be bound to string values at present.


## Different kinds of syntax

1. Check the AngularJS documentation : link to it
2. Explain each of them with the help of exaples


## Things to remember

1. If the model is present and not selected, Angular will generate a default option element. This is done for not accidently selecting a model - instead Angular will provide this option to the user
2. Selecting the default option is little bit tricky. Usually this is done from the controller itself
3. IE8 has some issues I guess : check and update here

## Summary

Thanks for reading !! ng-options is a powerful directive if you know how to use. 
