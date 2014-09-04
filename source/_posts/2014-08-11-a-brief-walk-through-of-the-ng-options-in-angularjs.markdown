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

Let's change the items to an array of objects.

```js
$scope.items = [{name: 'one', age: 30 },{ name: 'two', age: 27 },{ name: 'three', age: 50 }];
```

and the html will be

```markup
<html ng-app="app">
  <body>
    <div ng-controller="Test">
    	<p>selected item is : {{selectedItem}}</p>
      <select ng-model="selectedItem">
        <option ng-repeat="item in items" value="{{item.age}}">{{item.name}}</option>
      </select>
    </div>
  </body>
</html>
```
If you notice, the `selectedItem` model is bound to the value of the selected option element. Here we have a limitation of setting the value to only of string type( as explained above ). If we want to have the selectedItem bound to the actual object of items array, then we need to use ng-options.

**Re-write the above code using ng-options**:

We can re-write the above code using ng-options. With ng-options, our html will look like below:

```html
<html ng-app="app">
  <body>
    <div ng-controller="Test">
    	<p>selected item is : {{selectedItem}}</p>
    	<p> age of selected item is : {{selectedItem.age}} </p>
      <select ng-model="selectedItem" ng-options="item.name for item in items">
      </select>
    </div>
  </body>
</html>
```

Now the `selectedItem` will be bound to an object instead of the string value. 

The syntax of the ng-options is bit weird. I took some time to really understand the syntax. Next section is dedicated for explaining various ways of using ng-options.

## Different kinds of syntax

1. Check the AngularJS documentation : link to it
2. Explain each of them with the help of examples


## Things to remember

1. If the model is present and not selected, Angular will generate a default option element. This is done for not accidently selecting a model - instead Angular will provide this option to the user
2. Selecting the default option is little bit tricky. Usually this is done from the controller itself
3. IE8 has some issues I guess : check and update here

## Summary

Thanks for reading !! ng-options is a powerful directive if you know how to use. 
