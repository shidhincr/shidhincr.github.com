---
layout: post
title: Practical Guide to PreLink, PostLink and Controller Methods of Angular Directives
date: "2014-07-07 14:20:58 +0400"
comments: true
categories: 
  - angularjs
  - directives
published: false
---
 
I have discussed about the scope of a directive in my previous [article](http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/). Here we're going to see how to use the link and controller functions of an AngularJs directive.

## Link function of an Angular Directive

As the name implicates, the link function has the duty of linking the model to the templates. Link function is the place where AngularJs does the data binding to the compiled templates. Let's take a look at the signature of a link function.
<!--more-->

```javascript
	link: function LinkFn(scope, elem, attr, ctrl){}	
```
There are 3 parameters available to the link function. 

1. **scope** : 	The `scope` of the directive
2. **elem** : 	Dom element where the directive is applied
3. **attr** : 	Collection of attributes of the Dom Element
4. **ctrl** : 		Array of controllers required by the directive

Now let's create a simple directive to see how the data binding works. See the JSFiddle below:

{% jsfiddle shidhincr/Bpxn2%}

The `name` and `greeting` properties attached to the scope are linked to the template once the link function is executed. And, the browser will show **"Hey, I am Paul"** in the view. 

The above is the usual way to create a link function inside a directive. However, AngularJs  allows to set the `link` property to an object also. Advantage of having an object is, we can split the link function into two separate methods called, `pre-link` and `post-link`. In the following sections, we'll see how to use these link functions.

## PostLink

<!--1. Post link is same as the link function-->
<!--2. Example syntax-->

In the previous sections, we saw how to create a link function. For AngularJs, the link function is we created is a post-link function. So in general we can write the post-link function in two ways:

1) Simply set the link method.

```javascript
var app = angular.module('app', []);
app.directive('dad', function () {
    return {
        restrict: 'EA',
        template: '<div>{{greeting}}{{name}}</div>',
        link: function(scope,elem,attr){
            scope.name = 'Paul';
            scope.greeting = 'Hey, I am ';
        }
    };
});
```
2) link property points to a object literal, which has a `post ` method.

```javascript
var app = angular.module('app', []);
app.directive('dad', function () {
    return {
        restrict: 'EA',
        template: '<div>{{greeting}}{{name}}</div>',
        link: {
        	post: function(scope,elem,attr){
	            scope.name = 'Paul';
	            scope.greeting = 'Hey, I am ';
	        }	        }
    };
});
```
<div class="info">
Both denotes valid post-link functions. In most cases, we need to use the link as a method as shown in step <em>1<em>.
</div>

## PreLink

<!--
1. Most of the times not required
2. We're going to see one of the use case when it's required.
3. Create a directive <son> and add it to the <dad> directive
4. Create data binding : scope.text = 'my dad's name is name.'
-->
## Controller

<!--
1. Designed for sharing data between multiple directives.
2. Re-arrange the above code to make it work with the controller
3. Good practice is to use with the controller
4. Keep the link function for attaching the events and model of own
5. Controller will work as the public API of the directive
-->

## Order of Execution

<!--1. Controller is executed first, then pre-link and post-link-->

## Summary

**Post**

_Dos:_

_Don't:_

**Pre**

_Dos:_

_Don't:_

**Controller**







