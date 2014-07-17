---
layout: post
title: "Mastering the scope of the directives in AngularJS"
date: 2014-02-11 08:26
comments: true
published: true
categories: 
- Directives
- AngularJS
- Scope
- Isolated scope
- Directive definition objects

---

![](https://lh5.googleusercontent.com/-XOGfvAHr7HQ/UvoUItkZMZI/AAAAAAAAHJk/IJz5JcUB9dw/w520-h274-no/scopes_in_directives.png)


##What are Directives

Directives are one of the most powerful features of AngularJS. You can imagine them as building blocks ( aka re-usable components ) of any AngularJS application. Mastering all the directives, is totally out of this article’s scope. For that, I would really recommend this [book](http://www.packtpub.com/AngularJS-directives/book); it covers everything you need to know about directives. Here, we’ll discuss one aspect of directives called : "**Directive scope**".
<!--more-->

## Scopes in AngularJS

Unlike the other MVC frameworks, AngularJS doesn't have specific classes or functions to create `model` objects. Instead, AngularJS extended the raw JavaScript objects with custom methods and properties. These objects, also known as `scope` in AngularJS terms, work as a glue between the view and other parts ( directives, controllers and services ) inside the AngularJS application. 

Whenever the AngularJS application is bootstrapped, a `rootScope` object is created. Each scope created by controllers, directives and services are prototypically inherited from `rootScope`. AngularJS documentation is one of the best resources to learn how scope inheritance works: see [Scopes in AngularJS](https://github.com/angular/angular.js/wiki/Understanding-Scopes). Understanding how scope inheritance works will be useful in following sections.

##Scope inside a directive

***Note**: This section assumes you've prior knowledge of creating  a simple directive*

All directives have a scope associated with them. They use this scope for accessing data/methods inside the template and link function. By default, unless explicitly set, directives don't create their own scope. Therefore, directives use their parent scope ( usually a controller ) as their own. 

However, AngularJS allows us to change the default scope of directives by passing a configuration object known as **directive definition object**. A directive definition object –– let's call it as  *DDO* –– is a simple JavaScript object used for configuring the directive's behaviour,template..etc. Check out [AngularJS docs](http://docs.AngularJS.org/guide/directive) about *DDO*.

```javascript
	var app = angular.module("test",[]);
	app.directive("myDirective",function(){
		return {
			restrict: "EA",
			scope: true,
			link: function(scope,elem,attr){
				// code goes here ...
			}
		}	
	 });
```

In the above example, we created a directive by returning a *DDO* from the function. There are a lot of properties of the *DDO* to learn, but here we're just going to discuss the `scope` property, because, the values of scope property decides how the actual scope is created and used inside a directive. These values can be either **"false"**, **"true"** or **"{}"**. In the following sections, we'll see how each of these affects directive's behaviour.

##Different types of directive scopes

<u>**Scope :</u>  False**  (  Directive uses its parent scope )
	
Let's try another example. We'll create simple directive to render a div and a textbox that can show and change a name. The `name` property gets the initial value from the `Ctrl1` scope ( parent scope of the directive ).

{% jsfiddle shidhincr/eyNYw/4/ %}
	
If we change the name inside the textbox, notice the header name also gets changed. Since there's no scope provided in the *DDO*, the directive uses its parent scope. Therefore, any changes we make inside the directive are actually reflected in the parent scope. Similarly, parent `Ctrl1` scope has  a method to reverse the name and this gets triggered when we click on the header. Now as we expect, clicking on the header should reverse the name inside the directive too.

<u> **Scope :</u> True**  ( Directive gets a new scope )

Now it's time for the directive to get its own scope. This is achieved by setting a "true"  value to the scope property of the *DDO*. When directive scope is set to "true", AngularJS will create a new scope object and assign to the directive. This newly created scope object is prototypically inherited from its parent scope ( the controller scope where it's been used ).

Confused ? Let's see the exact differences between setting `scope: true` and `scope: false` :

- When scope is set to "**true**", AngularJS will create a new scope by inheriting parent scope ( usually controller scope, otherwise the application's rootScope ). Any changes made to this new scope will not reflect back to the parent scope. However, since the new scope is inherited from the parent scope, any changes made in the `Ctrl1` ( the parent scope ) will be reflected in the directive scope.
- When scope is set to "**false**", the controller `Ctrl1` and directive are using the same scope object. This means any changes to the controller or directive will be in sync.

Let's look at the following fiddle to make it more clear :

{% jsfiddle shidhincr/q3kex/3/  %}

First, try clicking on the header. We can see that the name gets reversed inside controller `Ctrl1` and the directive. Next, change the name inside the textbox; the parent `scope` is not at all affected. 

*__Note:__ Clicking on header again, makes no changes to the directive `scope`. I guess this is because the `ng-model` will create a new name property only when the textbox value is changed. Before this, name property inside directive was referring to it's parent `scope` ( through prototype chain )*

<u> **Scope :</u>  { }** ( Directive gets a new isolated scope )
 
This is the most interesting section. Till now, we saw two situations for directive scope creation. In the third type, we are going to set scope property in *DDO*  to an **Object literal**. When an object literal is passed to the scope property, things are bit different. This time, there will be a new scope created for the directive, but it **will not be inherited from the parent scope**. This new scope also known as **Isolated scope** because it is completely detached from its parent scope.

Let's re-write our original example like this :

```javascript
	var app = angular.module("test",[]);
	app.directive("myDirective",function(){
		return {
			restrict: "EA",
			scope: {},
			link: function(scope,elem,attr){
				// code goes here ...
			}
		}	
	 });
```

So far, this is the recommended way of setting the `scope` on *DDO* while creating custom directives. Why? Because: 

- It'll make sure that our directive is generic, and placed anywhere inside the application. Parent scope is not going to interfere with the directive scope. 

Though it's called as an *Isolated scope*, AngularJS allows to communicate with the parent scope using some special symbols knows as **`prefixes`**. Because of course there are still situations where the directive needs to be able to exchange data with parent scope. The next section is  dedicated to *Isolated scope* and its properties.

## Isolated Scope Explained

See the below fiddle:

{% jsfiddle shidhincr/q3kex/4/  %}

We just created a directive with an isolated scope. Notice, even the parent scope has a name "Harry", the textbox inside directive is blank. This is because of the new *Isolated scope* doesn't know anything about its parent scope.

**But, can we pass some values from the parent `scope` to the directives now?**

Yes ! Not only that, we might need to handle situations like invoking callbacks in parent scope, two-way binding between parent & directives scope ..etc

To access any parent scope data, we need to pass that to our directive explicitly. This is achieved by setting properties on the scope object in the *DDO*. Imagine these properties as interfaces of the directive to communicate with outside scope. Another important thing is that, these properties also **MUST** be set as the attributes of the directive html element. If this confusing, let me explain with an example:

Just go through the below fiddle, and look at the "HTML", "JavaScript" and  "Results" tabs.

{% jsfiddle shidhincr/pJLT8/10/  %}

Let's try to understand how this works. Take the JavaScript code first:

```javascript
 var app = angular.module("app", []);
 app.controller("MainCtrl", function( $scope ){
    $scope.name = "Harry";
    $scope.color = "#333333";
    $scope.reverseName = function(){
     $scope.name = $scope.name.split("").reverse().join("");
    };
    $scope.randomColor = function(){
        $scope.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    };
});
app.directive("myDirective", function(){
    return {
        restrict: "EA",
        scope: {
            name: "@",
            color: "=",
            reverse: "&"
        },
        template: [
            "<div class='line'>",
            "Name : <strong>{{name}}</strong>;  Change name:<input type='text' ng-model='name' /><br/>",
            "</div><div class='line'>",
            "Color : <strong style='color:{{color}}'>{{color|uppercase}}</strong>;  Change color:<input type='text' ng-model='color' /><br/></div>",
            "<br/><input type='button' ng-click='reverse()' value='Reverse Name'/>"
        ].join("")    
    };
});
```

It's clear that, the controller `MainCtrl` creates the parent scope. This parent scope has following properties and methods.

	name = "Harry"
	color =  "#333333"
	reverseName = function for reversing the name
	randomColor = function for generating random color code

Similarly, we've created our directive in *Isolated scope* by setting an object literal in the *DDO*. Notice our scope object has some properties now :

	scope: {
            name: "@",
            color: "=",
            reverse: "&"
        }

Look at the directive template and we can see the scope properties are used there. Mostly the directive's templates and link function are going to consume the scope properties. The behaviour of these properties again depends on their values –– also known as  __*Prefixes*__  –– provided. These  __*Prefixes*__ are used to bind the parent scope's methods and properties to the directive scope.
	

There're 3 types of prefixes AngularJS provides.

	1. "@"   (  Text binding / one-way binding )
	2. "="   ( Direct model binding / two-way binding )
	3. "&"   ( Behaviour binding / Method binding  )

All these prefixes receives data from the attributes of the directive element. Let's take another look at the HTML code:

```html
{% raw %}
<div my-directive 
  class="directive"
  name="{{name}}" 
  reverse="reverseName()" 
  color="color" >
</div>
{% endraw %}
```

When the directive encounters a prefix in the scope property, it will look for an attribute ( with same property name ) on directive's html element. However, we can provide a different mapping between property and attributes. This is done by giving a separate attribute name after the prefix. Look at below code to make it more clear.

```javascript
scope : {
	name: "@"
}
```
The above will be mapped to an attribute "name" in the directive. Now let's see what happens if we change the code like below:

```javascript
scope : {
	name: "@parentName"
}
```
At this time, the name property will be looking for an attribute "parentName" to get its value. Simply, any string after the  __*Prefixes*__ should match the attribute name.

*__Note__ : If you gets confused in any of the sections below, have a look at the demo code ( HTML,JS ) and come back*

- The "@" prefix is a one-way binding between the directive scope and parent scope. It always expects the mapped attribute to be an expression. This is very important; because to make the "@" prefix work, we need to wrap the attribute value inside `{% raw %}{{}}{% endraw %}`. Since "@" is creating a one-way binding between the parent and directive scope, any changes made in the parent scope will reflect inside the directive scope, but not the other way. "@" prefix is really useful when our directive needs to be initialised with some data from parent scope.
	<div class='info'>
	See this in demo by clicking on the "Reverse name" button in the parent scope. You can see that names inside parent and directive scopes gets reversed. Now let's change the name from the directive's textbox; you can see that the changes will be applicable only to the directive scope.
	</div>

- Secondly we have the "=" prefix. It creates a two-way binding between the parent and directive scope. The most important point about "=" prefix is, it'll always expect the attribute value to be the `model` name. That means you cannot provide an expression as the value of attribute mapped to "=" prefix. This is useful, when any of our directive scope property to be same as the parent scope property.
	<div class='info'>
	In the demo, try clicking on the "Randomize color" button and observe the changes inside the parent and directive scopes. Similarly, try changing the color textbox and you can see that the parent scope color also gets changed.
	</div>

- Finally, we're going to talk about the last prefix. The "&" prefix is also known as a method binding. This is used to bind any methods from the parent scope to the directive scope. This will be particularly useful when our directive needs to execute any callbacks in the parent scope. Look at the code to see how attribute value for the "&" prefix to be set.
	<div class='info'>
	Parent scope has a method called "reverseName". Through our "&" prefix, we bound the "reverseName" method to a scope property named "reverse". So whenever the "reverse()" method is executed inside the directive, it'll basically invoke the "reverseName" in the parent scope. Click on the "Reverse name" inside directive to see it in action.
	</div>

I know that AngularJS have made these things a little bit difficult to understand. Especially when it comes to the random naming conventions they'd chosen. If you’re still confused, I would recommend having a look at the below article:

[AngularJS directives: Isolated scope prefixes ](http://umur.io/AngularJS-directives-using-isolated-scope-with-attributes/) . This one explains the *Isolated scope*  and it's properties neatly.

That's it !  This post ended up becoming much longer than I expected, because I wanted to include everything I know. I hope everyone enjoyed reading this. If you find any errors I would really appreciate it if you guys could send me your corrections and comments ––  the comment box is made just for that. Thanks everyone !!

Special thanks to *David Tulip* for proof-reading and helping me to fix grammatical errors.

<u>**Further Read :**</u>

1. [https://github.com/angular/angular.js/wiki/Understanding-Scopes](https://github.com/angular/angular.js/wiki/Understanding-Scopes)
2. [http://amitgharat.wordpress.com/2013/06/08/the-hitchhikers-guide-to-the-directive/](http://amitgharat.wordpress.com/2013/06/08/the-hitchhikers-guide-to-the-directive/)
3. [http://www.ng-newsletter.com/posts/directives.html](http://www.ng-newsletter.com/posts/directives.html)
4. [https://egghead.io/lessons/angularjs-understanding-isolate-scope](https://egghead.io/lessons/angularjs-understanding-isolate-scope)










