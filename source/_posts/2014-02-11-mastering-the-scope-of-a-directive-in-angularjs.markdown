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
- Directive definition object

---

![](https://lh5.googleusercontent.com/-XOGfvAHr7HQ/UvoUItkZMZI/AAAAAAAAHJk/IJz5JcUB9dw/w520-h274-no/scopes_in_directives.png)


##What are Directives

Directives are one of the most powerful features of AngularJs. You can imagine them as the building blocks ( aka re-usable components ) of any AngularJs application. Mastering the entire directives, is strictly out of topic for this article. For that purpose, I would really recommend this [book](http://www.packtpub.com/angularjs-directives/book) as it has covered the nuts and bolts of them. And here, we'll discussing a small part of the directives called : "**Directive scope**".
<!--more-->

## Scopes in AngularJS

Unlike the other MVC frameworks, AngularJs doesn't have any `model` classes or functions to create `model` objects. Instead, AngularJs extended the plain JavaScript object with custom methods and properties. This special object, also known as the `scope` in AngularJs terms; It works as a glue between the view and other parts ( directives, controllers and services ) of the AngularJs application. 

Whenever the AngularJs application is bootstrapped, a `rootScope` object is created. All the scopes created by controllers,directives,services are always inherited from this `rootScope`. This pattern is applicable to any nested controllers, directives added inside any controllers..etc. The point you need to remember is, `scopes` will be nested inside the AngularJs application and it'll always start from the `rootScope`. Before going to the next section, get a good grasp on how `scope` works. See this link :  [Scopes in AngularJS](https://github.com/angular/angular.js/wiki/Understanding-Scopes).

##Scope inside a directive

***Note**: This section assumes you've prior knowledge of creating  a simple directive*

All directives always have a scope associated with it. This scope object can be accessed inside the directive's link function. Same way, all the methods and properties of the scope will be available inside the directive's template also.
By default, a directive will not have it's own scope. So the directive will share the the same scope of it's parent ( Controller scope ) where it's been used. But there's always we can force the directive to create a new scope by changing it's directive definition object. A `directive definition object` ( let's call it as  *DDO* ) is used to configure a directive when it's defined –– to know more about it check AngularJs docs about directives [link](http://docs.angularjs.org/guide/directive). The *DDO* has a  property called `scope` and this is used for setting the scope of the directive. Let's see the example below:

```javascript
	var app = angular.module("test",[]);
	app.directive("myDirective",function(){
		return {
			restrict: "EA",
			scope: true,
			link: function(scope,elem,attr){
				// code goes here ...			}		}		 });
```
Setting a "false" value to the `scope` property in *DDO* is same as having **no** own scope for the directive. At this time, directive will share the parent scope. The other values to the scope property are "true" and "{ }". In the next section, we'll see how these values affect the directive's behaviour.

##Different types of directive scopes

<u>**Scope :</u>  False**  (  Parent scope  will be shared to directive )
	
Let's try another example. We're creating a simple directive that will render a div and a textbox to show and change a name. The `name` property get's the initial value from the `Ctrl1` scope ( the parent scope of the directive ).

{% jsfiddle shidhincr/eyNYw/4/  %}
	
Try changing the name inside the textbox; we can see that the name inside the header also got changed. Since there's no scope provided in the *DDO*, the directive gets it's parent scope shared to it. Hence any changes we make inside the directive is actually reflecting in the parent scope. The parent `Ctrl1` has  a method to reverse the name; this method gets triggered when you click on the header. Now if you observe, by clicking on the header will reverse the name inside the directive also.

<u> **Scope :</u> True**  ( New child scope will be created for the directive )

It's time for the directive to get some own scope. By setting "true" to the scope property, AngularJs will create a new scope object and set to the directive. This new scope created, will be prototypically inherited from it's parent scope. So instead of sharing the actual parent scope to directive, it's going to get a scope object inherited from the parent scope. 

The exact difference between setting `scope: true` and `scope: false` is like this:

- When scope is set to "**true**", there's explicitly a new scope object created for the directive. Any changes made inside the directive will affect the child scope and not the parent scope. Since the child scope is inherited from the parent scope, any changes made in the `Ctrl1` ( the parent scope ) will affect the child scope also.
- When scope is set to "**false**", the `Ctrl1` and directive are sharing the same scope. This means any changes happening in the controller or directive will reflect in both places.

Let's look at the following fiddle to make it more clear :

{% jsfiddle shidhincr/q3kex/3/  %}

First, try clicking on the header. We can see that the name got reversed inside both `Ctrl1` and  directive. Secondly,  change the name inside the textbox; we can see that parent `scope` is not at all getting affected. 

*__Note:__ If we click on the header again, we can notice that it'll not reflect inside the directive `scope`. But we saw this working when the first time we clicked the header. I guess this is because the `ng-model` will only create a new name property once the textbox value is changed; Till then the name property inside directive was referring to it's parent `scope` ( through prototype chain )*

<u> **Scope :</u>  { }** ( Complete isolated scope will be created for the directive )
 
Now we've reached the most interesting part of our article. As of now, we've seen two situations where a directive scope got created. In the third type, we are going to set scope property in the *DDO*  to an **Object literal**. When an object literal is passed to the scope property, things are bit different. At this time, there will be a new scope created for the directive, but **will not be inherited from the parent scope**. That means, the directive is going to get a complete *Isolated scope*. By an isolated scope means, any changes from the parent scope is going to alter the directive scope and vice versa.

Let's re-write our original directive example like this :

```javascript
	var app = angular.module("test",[]);
	app.directive("myDirective",function(){
		return {
			restrict: "EA",
			scope: {},
			link: function(scope,elem,attr){
				// code goes here ...			}		}		 });
```

By far, this is the most recommended way of setting the `scope` on *DDO* while creating custom directives. Why because: 

- It'll make sure that  directive is so generic and can be placed anywhere inside the application. Parent scope is not going to interfere with the directive scope anyways. 

Though it's been called as an *Isolated scope*, AngularJs allows to communicate with the parent scope using some special symbols knows as `*prefixes*`. You might wonder why ? and the answer is : there're many situations we need to get the data from parent scope, execute callbacks in the parent scope when changes inside directive happens ..etc. The next section is entirely dedicated for explaining the *Isolated scope* and it's properties.

## Isolated Scope Explained

See the below fiddle:

{% jsfiddle shidhincr/q3kex/4/  %}

We have invoked the directive by passing an empty object to the *DDO*. Now we can see that, even though the parent scope has a name = "Harry" , the textbox inside the directive is blank. This is because of the new *Isolated scope* who doesn't know anything about it's parent scope.

**But, what if we want to pass some values from the parent `scope` to the directives ?**

That's absolutely a very good question. Not only just passing some values from the parent, but there can be situations like, changes inside the directives should invoke some callback functions in parent scope; and sometimes, we need two-way binding between parent & directives scope ..etc

For this purposes, AngularJs will allow properties to be added to the **Object literal** passed to the *DDO*. These  properties **MUST** be set as an attributes of the directive element ( which we are going to place in our HTML ). Don't worry if I'm so creating so much confusion over here, let me explain with an example:

Just go through the below fiddle, and look at the "HTML", "JavaScript" and  "Results" tabs.

{% jsfiddle shidhincr/pJLT8/10/  %}

Now let's try to understand how this works. Take the JavaScript code first:

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

You can clearly see that, there's this controller `MainCtrl` which creates the parent scope. Parent scope has the following properties and methods.

	name = "Harry"
	color =  "#333333"
	reverseName = function for reversing the name
	randomColor = function for generating random color code

Similarly we've created our directive in *Isolated scope* by setting an object literal in the *DDO*. What looks interesting is that our scope object contains some properties :

	scope: {
            name: "@",
            color: "=",
            reverse: "&"
        }

Let's check the directive template. We can see that these properties are referenced there. This means, these properties are finally going to be used inside our directives template or the directive link function. Their behaviour depends on the values –– also known as  __*Prefixes*__  –– provided. These  __*Prefixes*__ are basically used to bind the parent scope's methods and properties to the directive scope.	

There're 3 types of prefixes AngularJS provides.

	1. "@"   (  Text binding / one-way binding )
	2. "="   ( Direct model binding / two-way binding )
	3. "&"   ( Behaviour binding / Method binding  )

All these prefixes takes the data from the attributes of the directive element. Let's re-look at the HTML code:

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

When the directive encounters a prefix in the scope object, it will try to map it with the corresponding attribute of the directive element.  It'll try to map the same attribute name if the prefix is not followed by extra name. For example:

```javascript
scope : {
	name: "@"}
```
The above will be mapped to an attribute "name" in the directive. Now let's see what happens if we change the syntax like below:

```javascript
scope : {
	name: "@parentName"}
```
At this time, the name property will be looking for an attribute "parentName" for getting it's value. This means, any string after the  __*Prefixes*__ should be matching with the attribute name. I think these parts clear for you now. Let's gets back to the actual difference between each  __*Prefixes*__.

*__Note__ : If you're confused in any of the sentences below, have a look at the demo code ( HTML,JS ) and come back*

- The "@" prefix is a one-way binding between the directive scope and parent scope. "@" prefix always expect it's mapped attribute way to be an expression. This is very important; because to make the "@" prefix work, we need to wrap the attribute value inside `{% raw %}{{}}{% endraw %}`. Since "@" is creating a one-way binding between the parent and directive scope, any changes made in the parent scope will reflect inside the directive scope; but not vice versa. "@" prefix is highly useful when our directive needs to be initialised with some data from it's parent scope.

	To understand how it works in our demo, try clicking on the "Reverse name" button in the parent scope. You can see that both names inside parent and directive scopes got reversed. Now let's change the name from the  textbox inside the directive; you can see that the changes will be applicable only to the directive scope.

- Now comes the second "=" prefix. As it looks like, it creates a two-way binding between the parent and directive scope. The important point about "=" prefix is that, it'll always expect the attribute value to be the model name. That means, you cannot provide an expression as the value of attribute mapped to "=" prefix. This is useful, when any of our directive scope property to be same as the parent scope property.

	In the demo, try clicking on the "Randomize color" button and observe the changes inside the parent and directive scopes. Similarly, try changing the color textbox and you can see that the parent scope color also got changed.

- Alas, we've finally reached the last prefix. The "&" prefix is also known as a method binding. This is used to bind any methods from the parent scope to the directive scope. This prefix is particularly useful when our directive needs to execute any  callbacks in the parent scope. Look at the code to see how attribute value for the "&" prefix to be set.
	
	In the demo, parent scope has a method called "reveseName". Through our "&" prefix, we bound the "reverseName" method to a scope property named "reverse". So whenever the "reverse()" method is executed inside the directive, it'll basically invoking the "reverseName" in the parent scope. Click on the "Reverse name" inside directive to see it in action.

I know that AngularJs have made these things little bit difficult to understand. Especially because of these random naming conventions they've chosen. I believe I've tried my best to explain how the *Isolated scope*  works inside a directive. If you think you're still confused, I would recommend to have a look at the below article:

[AngularJS directives: Isolated scope prefixes ](http://umur.io/angularjs-directives-using-isolated-scope-with-attributes/) . This one explains the *Isolated scope*  and it's properties clearly. It would definitely help to get away from any sort of confusions.

That's it !  I really didn't think that this post is going to be this much longer. But I couldn't help with that because, I didn't want to miss any points when I complete this. I hope everyone enjoyed reading this. I would've made any errors / personal opinions; but I really want you guys to correct me when I am wrong –– comment box is made just for that. Thanks everyone !!









