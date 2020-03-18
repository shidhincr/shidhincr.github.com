---
layout: post
title: Practical Guide to PreLink, PostLink and Controller Methods of Angular Directives
date: 2014-07-07 
comments: true
categories:
  - angularjs
  - directives
published: true
permalink: 2014/07/07/practical-guide-to-prelink-postlink-and-controller-methods-of-angular-directives/
---

I have discussed about the scope of a directive in my previous [article](http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/). Here we're going to see how to use the link and controller functions of an AngularJs directive.
<!-- more -->
## Link function of an Angular Directive

As the name implicates, the link function has the duty of linking the model to the templates. Link function is the place where AngularJs does the data binding to the compiled templates. Let's take a look at the signature of a link function.


```js
	link: function LinkFn(scope, elem, attr, ctrl){}
```
There are 4 parameters available to the link function.

1. **scope** : 	The `scope` of the directive
2. **elem** : 	Dom element where the directive is applied
3. **attr** : 	Collection of attributes of the Dom Element
4. **ctrl** : 		Array of controllers required by the directive

Now let's create a simple directive to see how the data binding works. See the JSFiddle below:

<iframe loading="lazy" class="embedd-iframe" src="//jsfiddle.net/shidhincr/Bpxn2/embedded/js,html,css,result/" ></iframe>

The `name` and `greeting` properties attached to the scope are linked to the template once the link function is executed. And, the browser will show **"Hey, I am Paul"** in the view.

The above is the usual way to create a link function inside a directive. However, AngularJs  allows to set the `link` property to an object also. Advantage of having an object is, we can split the link function into two separate methods called, `pre-link` and `post-link`. In the following sections, we'll see how to use these link functions.

## PostLink

<!--1. Post link is same as the link function-->
<!--2. Example syntax-->

In the previous sections, we saw how to create a link function. For AngularJs, the link function is we created is a post-link function. So in general we can write the post-link function in two ways:

**1)** Simply set the link method.

```js
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
**2)** link property points to a object literal, which has a `post ` method.

```js
var app = angular.module('app', []);
app.directive('dad', function () {
    return {
        restrict: 'EA',
        template: '<div>{{greeting}}{{name}}</div>',
        link: {
        	post: function(scope,elem,attr){
	            scope.name = 'Paul';
	            scope.greeting = 'Hey, I am ';
	        }
        }
    };
});
```
<div class="info">
Both denotes valid post-link functions. In most cases, we need to use the link as a method as shown in step 1.
</div>

## PreLink

<!--1. Most of the times not required-->
<!--2. We're going to see one of the use case when it's required.-->
<!--3. Create a directive <son> and add it to the <dad> directive-->
<!--4. Create data binding : scope.text = 'my dad's name is name.'-->

The signature is of the pre-link function is same as that of a post-link. The only difference between the pre-link and a post-link is the order they gets executed. The following code will explain more clearly.

Let's create a new directive called `<son>` and place inside the template of `<dad>` directive.

<iframe loading="lazy" class="embedd-iframe" src="//jsfiddle.net/shidhincr/Bpxn2/1/embedded/js,html,css,result/" ></iframe>

We created a **son** directive and placed inside the **dad** directive's template. Since there is no scope specified for the **son** directive, we assume that all parent directive scope should be available to it. Let's look at the output tab of the jsFiddle, we can see that the **son** directive prints like this:

	Hey, I am son, and my dad is undefined

Notice that the dad's name is *undefined* ?

Now let's analyse what happened. Here, both the **dad** and **son** directives have link functions, and both these link functions are post-links. When a directive contains multiple child directives, all of the child directive's link functions executed first then the parent directive link function. So, in this case, when  **son** directive's link function executes, the **dad** directive is still not linked the data to the template. That's why the **son** directive outputs the dad's name as **undefined**.

<u>How to solve this issue ?</u>

This is where the `pre-link` comes handy. A pre-link function of a directive will get executed before all of its child directives' link functions. Let's modify our jsFiddle:

<iframe loading="lazy" class="embedd-iframe" src="//jsfiddle.net/shidhincr/Bpxn2/2/embedded/js,html,css,result/" ></iframe>

See the output tab. Dad's name is now available to the son.

## Controller

Changing post-link to pre-link will solve the above problem. However, it's not a best practice to create pre-link functions whenever we introduce a child directive. Assume, if instead of a child directive, what if we want to share some data to another directive applied to the same DOM element ?

Directive's controller is designed for that. A controller is a place where directive can define it's public API. Let's solve the above problem in controller way.

<iframe loading="lazy" class="embedd-iframe" src="//jsfiddle.net/shidhincr/Bpxn2/2/embedded/js,html,css,result/" ></iframe>

Here, we're defining a proper API, and our directive is more robust now. Similarly,  we're making sure that the **son** directive has a dependency on the **dad** directive. In simple words, son cannot exist with out a dad. We can see that, AngularJs will throw an error when the son directive is placed outside the dad directive. This makes sure that our code is well error handled.

## Order of Execution

1. Controller gets executed first
2. Pre-link gets  executed next
3. Post-link gets executed last

## Summary

<u>**Post :**</u>
This is the most commonly used for data binding

- Safe to attach event handlers to the  DOM element
- All children directives are linked, so it's safe to access them
- Never set any data required by the child directive here. Because child directive's will be linked already.

<u>**Pre :**</u>
Used rarely. One of the use case is when a child directive requires data from its parent, the parent directive should set it through its pre-link function.

- Set data required for its child directives
- Safe to attach event handlers to the DOM element
- Not safe to access DOM elements belong to child directives. They're not linked yet.

<u>**Controller :**</u>
Used for defining a proper API to the directive. Using controller, directives can communicate and share data each other.

- Set the data required to other directives.
- Never access DOM element inside the controller; it's against Angular's philosophy and make testing hard.
