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
<!--more-->
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

```html
{%raw%}
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
{%endraw%}
```
If you notice, the `selectedItem` model is bound to the value of the selected option element. Here we have a limitation of setting the value to only of string type( as explained above ). If we want to have the selectedItem bound to the actual object of items array, then we need to use ng-options.

**Re-write the above code using ng-options**:

We can re-write the above code using ng-options. With ng-options, our html will look like below:

```html
{%raw%}
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
{%endraw%}
```

Now the `selectedItem` will be bound to an object instead of the string value. See the codepen demo [here](http://codepen.io/shidhincr/pen/LeuDw) 

<div class="info">
If you notice, there will be a blank option element at first in the select box. This is because, we have the ng-model 'selectedItem' with an undefined value. To fix the issue, just set the 'selectedItem' to the first object in the items array. <br/>
$scope.selectedItem = $scope.items[0];
</div><br/>

Initially, the syntax of the ng-options looks very confusing to me. I really took some time to understand how it works. In the next section, we'll see the various ways of using ng-options.

## Different kinds of syntax

1. Check the AngularJS documentation : link to it
2. Explain each of them with the help of examples

Find the official [documentation](https://docs.angularjs.org/api/ng/directive/select) here. The type of the ng-options is named as  **comprehension expression**. As quoted from this [link](https://groups.google.com/forum/#!topic/angular/4EDe8xIbjLU)
>The "comprehension expression" is not the same as Angular expressions that $parse parses.  It is a custom expression specific to ngSelect.  You can actually see the regex it uses to parse in the ngSelect source file.

Now let's analyse each possible expressions for the ng-options.

<u>**For Array data  :**</u>

**1) `label` for `value` in `array`**

This is the simplest expression and commonly used. This expression tells **ng-options** directive to loop through the arrays, and generate option element with the current text. The generated html looks like this:

![](https://lh3.googleusercontent.com/-sWj95dIg0Co/VA0e8YuM7UI/AAAAAAAASRY/kmmupaPV1Ac/h114/Screenshot%2B2014-09-08%2B07.06.16.png)

The value of each option element is the loop index and the text is the actual array content. Note that the `label` is the one used to generate the text inside each option element, so it has to have the same name as the `value` if all the items inside the array are of type string. In the above example, both label and value referred as `item`.

ng-options works great when the array contains objects rather than plain strings. Let's change the items like this:

	$scope.items = [{name: 'one', age: 30 },{ name: 'two', age: 27 },{ name: 'three', age: 50 }];

here, we can write our expression as 

	ng-options="item.name for item in items"

The above code is simple to understand. We're telling angular that to loop through all the items in use `item.name` as the text inside each option element.

**2) `select` as `label` for `value` in `array`**

By default, unless specified, the model bound the parent select box will be the `value` of the expression. That means, in the previous example, the `item` is the model for the select element. If I select the second element in the select box, the model is like this:

![](https://lh5.googleusercontent.com/-H_M5Y7QW9Jw/VA0l1wZY6WI/AAAAAAAASRw/EB54lG4L-rA/h240/Screen%2BShot%2B2014-09-08%2Bat%2B7.43.05%2BAM.png)

However, AngularJS provides another variation of expression to change this behaviour. Using `select as` we can specify a different model to the select box. Let's see the below example:

	ng-options="item.age as item.name for item in items"

![](https://lh5.googleusercontent.com/-AY6sL4nCidI/VA0nnsQRQuI/AAAAAAAASR8/ja0NvwcMtyI/h128/Screen%2BShot%2B2014-09-08%2Bat%2B7.50.24%2BAM.png)

![](https://lh6.googleusercontent.com/-MkszZ2GNFv4/VA0n65cdfcI/AAAAAAAASSM/45mrEy-1XKU/h240/Screen%2BShot%2B2014-09-08%2Bat%2B7.51.34%2BAM.png)

Here, each option will have the text as `item.name` but when we select any of them, the selectedItem will be `item.age`.

**3) `label` group by `group` for `value` in `array`**



**4) `select` as `label` group by `group` for `value` in `array` track by `trackexpr`**

 <u>**For Object data  :**</u>
 
- `label` for `(key , value)` in `object`
- `select` as `label` for `(key , value)` in `object`
- `label` group by `group` for `(key, value)` in `object`
- `select` as `label` group by `group` for `(key, value)` in `object`


## Things to remember

1. If the model is present and not selected, Angular will generate a default option element. This is done for not accidentaly selecting a model - instead Angular will provide this option to the user
2. Selecting the default option is little bit tricky. Usually this is done from the controller itself
3. IE8 has some issues I guess : check and update here

## Summary

Thanks for reading !! ng-options is a powerful directive if you know how to use. 
