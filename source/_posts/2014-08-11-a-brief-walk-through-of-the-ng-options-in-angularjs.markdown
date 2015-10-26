---
layout: post
title: "A brief walk-through of the ng-options in AngularJS"
date: 2014-08-11 11:13:45 +0400
comments: true
published: true
categories: 
- AngularJS
- ng-options

---
![](https://lh4.googleusercontent.com/-ts5lhPEvP2U/VA2txu4TiLI/AAAAAAAASWs/ZR8EkWYzhcI/w681-h250-no/ng-options.jpg)

Using ng-options was bit tough for me. I banged my head couple of times when I actually used ng-options in my code. And most of the times, I had to google and find out how to make it work. Looking the AngularJS documentation didn't help much, as it's less informative and doesn't have much code samples. 

But, I could find lot of Stackoverflow links, and infact I understood the concepts after reading those links only. Here, finally, I decided to write a blog posts about what I learned. And you know, this post is going to be mostly useful to me more than any one; because next time, I don't need to google it.. :)

<!--more-->
## Why ng-options

Before that, let's see ng-repeat. The simple way of creating a dropdown in Angular is by using ng-repeat. Look at the code below:

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
We have an array of text in a property called `items`. The above code is ideal when the items array consists of only string data. However, this cannot be used when the items array contains objects. 

The AngularJS documentation for 'select' says to use ng-options instead of ng-repeat in this scenario. The reason behind is, option element can only hold string type as its value.

Quoted from AngularJS documentation:
> Note: ngOptions provides an iterator facility for the '`option`' element which should be used instead of ngRepeat when you want the select model to be bound to a non-string value. This is because an option element can only be bound to string values at present.

Let's change the items to an array of objects.

```js
$scope.items = [{name: 'one', age: 30 },{ name: 'two', age: 27 },{ name: 'three', age: 50 }];
```

and the HTML

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
If you notice, the `selectedItem` model is bound to the value of the selected option element. Here, as already explained, we're restricted to have only strings in our items array. We cannot set the selectedItem model to the object inside items. Therefore we need to use the ng-options for these kind of situations. Let's see how to do it.

**Re-write the above code using ng-options**:

We can re-write the above code using ng-options. The new html looks like below:

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

Now the `selectedItem` is bound to an object instead of the string value. You can see it in action [here](http://codepen.io/shidhincr/pen/LeuDw) 

<div class="info">
If you notice, the first element inside the dropdown is a blank option element. This is because, initially, the 'selectedItem' does not have any default value and is undefined. Since there's no default option selected, AngularJS will generate a new option tag and select it as default. To fix the issue, just set the 'selectedItem' to the first object in the items array. <br/>
$scope.selectedItem = $scope.items[0];
</div><br/>

In the next section, we'll see different types of ng-options expressions.

## Different kinds of syntax

Before we start, read the official [documentation](https://docs.angularjs.org/api/ng/directive/select) here. If you notice, the type of the ng-options is named as  a **comprehension expression**. As quoted from this [link](https://groups.google.com/forum/#!topic/angular/4EDe8xIbjLU)
>The "comprehension expression" is not the same as Angular expressions that $parse parses.  It is a custom expression specific to ngSelect.  You can actually see the regex it uses to parse in the ngSelect source file.

We'll cover these different type of **comprehension expressions** with the help of examples below.

<u>**For Array data  :**</u>

**1) `label` for `value` in `array`**

This is the simplest and commonly used expression. This tells **ng-options** directive to loop through the array, and generate option element containing the current value. The generated html looks like this:

![](https://lh3.googleusercontent.com/-sWj95dIg0Co/VA0e8YuM7UI/AAAAAAAASRY/kmmupaPV1Ac/h114/Screenshot%2B2014-09-08%2B07.06.16.png)

The *value* of each option element is the loop couter and the text inside the option element is the current array content. Note the `label` is the one generates the text inside each option element. So it should be same name as `value` if items array contains all premitive type. In the above example, both label and value referred as `item`.

The flexibility of ng-options is when the array contains objects rather than plain strings. To know more, let's change the items like this:

	$scope.items = [{name: 'one', age: 30 },{ name: 'two', age: 27 },{ name: 'three', age: 50 }];

And we can change our expression as 

	ng-options="item.name for item in items"

The above code is pretty simple to understand. We're telling angular that to loop through all the items in use `item.name` as the text inside each option element. Let's move to much more complex type of expressions.

**2) `select` as `label` for `value` in `array`**

By default, unless specified, the model bound the parent select box will be the `value` of the expression. That means, in the previous example, the `item` is the model for the select element. If we select the second element in the select box, the model is this:

![](https://lh5.googleusercontent.com/-H_M5Y7QW9Jw/VA0l1wZY6WI/AAAAAAAASRw/EB54lG4L-rA/h240/Screen%2BShot%2B2014-09-08%2Bat%2B7.43.05%2BAM.png)

However, AngularJS provides another variation of expression to change this behaviour. Using `select as` we can specify a different model to the select box. Let's see the below example:

	ng-options="item.age as item.name for item in items"

![](https://lh5.googleusercontent.com/-AY6sL4nCidI/VA0nnsQRQuI/AAAAAAAASR8/ja0NvwcMtyI/h128/Screen%2BShot%2B2014-09-08%2Bat%2B7.50.24%2BAM.png)

![](https://lh6.googleusercontent.com/-MkszZ2GNFv4/VA0n65cdfcI/AAAAAAAASSM/45mrEy-1XKU/h240/Screen%2BShot%2B2014-09-08%2Bat%2B7.51.34%2BAM.png)

Here, each option will have the text as `item.name` but when we select any of them, the selectedItem will be `item.age`.

**3) `label` group by `group` for `value` in `array`**

Group by is really a short cut for adding options groups.  In plain html, we need to use the `<optgroup>` tags to group a set of options. But here, we can specify ng-options to render optgroups based on `group` value. Let's see the below code.

```javascript javascript
$scope.items = [
     {name: 'one', age: 30 },
     { name: 'two', age: 27 },
     { name: 'three', age: 50 },
     { name: 'four', age: 15 },
     { name: 'five', age: 27 },
     { name: 'six', age: 30 }   
];
```
and the ng-options in HTML

	ng-options="item.name group by item.age for item in items"

The above expression tells Angular to group each options based on the `item.age`. If we run the code, the output looks like this

![](https://lh4.googleusercontent.com/-IMgiQ1KQINw/VA2flqQxDiI/AAAAAAAASVQ/LYQ4LHM6Th0/w239-h301-no/Screen%2BShot%2B2014-09-08%2Bat%2B1.38.12%2BPM.png)

**4) `select` as `label` group by `group` for `value` in `array` track by `trackexpr`**

This is similar to the previous one, and the only addition is the `track by`. If you have ever used `ng-repeat`, the `track by` won't surprise you. The syntax and usage is same as with `ng-repeat`.

Using `track by`, we can explicitly tell AngularJS to track each DOM node by the specified value. For example, we can use like this:

	ng-options="item.name group by item.age for item in items track by item.name"

**Bennadel** explained this pretty well in his [blog post](http://www.bennadel.com/blog/2556-using-track-by-with-ngrepeat-in-angularjs-1-2.htm).

 <u>**For Object data  :**</u>
 
ng-options is not just restricted to array types, but can be used for object data sources too.  In this section, we'll see how ng-options are used for object data. Let's modify the `items` in our code like below:

```javascript
$scope.items = {
    'one': 30,
    'two': 27,
    'three': 50,
    'four': 15,
    'five': 27,
    'six': 30
   };
``` 

**1) `label` for `(key , value)` in `object`**

The expression for object data source is similar to the array data source. The only difference in object data source is, everything is key value pairs. ng-options for object allows us to loop through these (key,value) pairs; The expression is pretty much self explanatory, as all other parts are similar to what we have seen already.

Let's modify the expression like this in our mark-up

	ng-options="name for (name, value) in items"
	
The generated html is like this:

![](https://lh3.googleusercontent.com/-eoAgJdq75go/VA_CWccGIqI/AAAAAAAASeo/OE-cjTGnGr4/h166/Screen%2BShot%2B2014-09-10%2Bat%2B7.15.04%2BAM.png)

The generated html is a select box with all the key names. Similarly, we can create the select box with only values, shown below.

	ng-options="name for (name, value) in items"

<div class="info">
For object data sources, the default model bound to the select box is the value, not the key. That means, in the above example, even though the select box displays only the key names, the model is actually bounds to its value. Try selecting an option in our demo, you can see that the selectedItem is printed as its value. However, this behaviour can be changed by using the 'select as' syntax.
</div><br/>

The remaining expressions available for object data source is given below. There is no need of any explanation as they are similar to the array data source. The only difference is, for objects, both `(key, value)` are available.

**2) `select` as `label` for `(key , value)` in `object`**

**3) `label` group by `group` for `(key, value)` in `object`**

**4) `select` as `label` group by `group` for `(key, value)` in `object`**


## Extra Points

1. If the model is present and not selected, Angular will generate a default option element. This is done for not accidentally setting the model value when the select box gets rendered.
2. There is no straight forward way of selecting the default options. Usually the controller is responsible for setting the model for select box, so that the default option will be selected automatically.
3. It's also possible to add filters to the ng-options expressions.

## Summary

Thanks for reading !! ng-options is a powerful directive. Mastering it properly will save lot of time in your next project.