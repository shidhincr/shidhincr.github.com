---
layout: post
title: "Mastering the scope of a directive in AngularJS"
date: 2014-02-11 08:26
comments: true
published: false
categories: 
- directives
- AngularJS
- Scope

---

![](https://lh5.googleusercontent.com/-XOGfvAHr7HQ/UvoUItkZMZI/AAAAAAAAHJk/IJz5JcUB9dw/w520-h274-no/scopes_in_directives.png)


##What are Directives

Directives are one of the most powerful features of AngularJs. You can imagine them as the building blocks ( aka re-usable components ) of any AngularJs application. Mastering the entire directives, is strictly out of topic for this article. For that purpose, I would really recommend this [book](http://www.packtpub.com/angularjs-directives/book) as it has covered the nuts and bolts of them. And here, we'll discussing a small part of the directives called : "**Directive scope**".
<!--more-->

## Scopes in AngularJS

Unlike the other MVC frameworks, AngularJs don't have any `model` classes/ functons to create `model` objects. Instead, AngularJs uses the raw JavaScript objects

Unlike other MVC frameworks, AngularJs don't implement separate classes/functions for creating a `model`. Instead, Angular uses the `scope` object for passing any data to the view. `scope` is nothing but a plain JavaScript object, but it contains lot of methods and properties added by AngularJS. For more information about `scope`, see this link: [Scopes in AngularJS](https://github.com/angular/angular.js/wiki/Understanding-Scopes).

##Scope inside a directive

***Note**: This section assumes you've prior knowledge of creating  a simple directive*

In AngularJS, directives will have always a `scope` associated with it. By default, directives will not have its own scope, thus  takes it's parent `scope`. But we can always force a directive to create a new `scope` by passing a `scope` property to the configuration object :

```javascript
	var app = angular.module("test",[]);
	app.directive("myDirective",function(){
		return {
			restrict: "EA",
			scope: true,
			link: function(scope,elem,attr){
				// code goes here ...			}		}		 });
```

If  no `scope` property found in the configuration object, AngularJS will assume a default value of `scope` is to `false`. We'll cover briefly what these values means to AngularJS directives.

##Different types of directive scopes

<u>**Scope :</u>  False**  (  Parent scope  will be shared to directive )
	
Look at the example below. We're creating a simple directive that will render a div and a textbox to show and change the name. We're setting the `name` property from the `Ctrl1` scope ( the parent scope of the directive ).

{% jsfiddle shidhincr/eyNYw/4/  %}
	
Try changing the name inside the textbox; we can see that the name inside the header also got changed. Here the directive has no scope provided, so it'll work on the parent `scope`. Hence any changes we make inside the directive will also reflect in the parent `scope`. 

Clicking on the header will reverse the name. Since the directive and  parent controller are sharing the same `scope`, the name inside the directive also got reversed.

<u> **Scope :</u> True**  ( New child scope will be created for the directive )

By providing a `true` value to the `scope` property, we're explicitly telling Angular to create a new `scope` when the directive is created. The new `scope` created is prototypically inherited from the parent `scope` ( ie, the scope of the parent controller ). When a new `scope` is created, this is kind of one-way binded; It means any changes in the parent `scope` will be reflected inside the directive `scope` but not vice versa. The directive will also have access to all the methods and properties of it's parent `scope`. Let's look this fiddle:

{% jsfiddle shidhincr/q3kex/3/  %}

First, try clicking on the header. We can see that the name got reversed inside both parent controller and  the directive. This is because, when directive is created with `scope: true`, it's creating a child `scope` prototypically inherited from it's parent. So initially, any changes in the parent `scope` will reflect in the child `scope` also.

Now comes the second part; Change the name inside the textbox. We can see that any changes we make inside the directives are not reflecting in the parent `scope`.  This is because, a new property of name is created in the child `scope` when the text box is changed. This will be accessible only inside the directive , thus will not be reflected in the parent `scope`. 

*__Note:__ If we click on the header again, we can notice that it'll not reflect inside the directive `scope`. But we saw this working when the first time we clicked the header. I guess this is because the `ng-model` will only create a new name property once the textbox value is changed; Till then the name property inside directive was referring to it's parent `scope` ( through prototype chain )*


<u> **Scope :</u>  { }** ( Complete isolated scope will be created for the directive )
 
Now we've reached the most interesting part of our article. There're situations in which we've to create complete new `scope` for our directives. By complete new `scope` I meant the `scope` which is not even prototypically inherited from the parent `scope`. 

For this , Angular provides a way by passing an object literal as the value of the `scope` property in the configuration object. Our original code can be re-written like this :

```javascript
	var app = angular.module("test",[]);
	app.directive("myDirective",function(){
		return {
			restrict: "EA",
			scope: {},
			link: function(scope,elem,attr){
				// code goes here ...			}		}		 });
```

By far, this is the most recommended way of setting the `scope` when we create our own custom directives. Why because: 

- This will make sure that our directive can be placed anywhere inside the application. None of the parent `scope` values are going to interfere with our directive. 

## Isolated Scope Explained

See the fiddle:

{% jsfiddle shidhincr/q3kex/4/  %}

We can see that the parent `scope` properties are not reflected inside the directive and the textbox value is blank.

**But, what if we want to pass some values from the parent `scope` to the directives ?**

Though we've created an isolated scope, AngularJS exposes some properties on the isolated `scope` object literals to access the parent `scope` properties. We need to explicitly provide these values as the **attributes** of the directives. 

There're 3 types of prefixes AngularJS provides for binding data from the parent `scope`. 

1. "@"   (  Text binding / one-way binding )
2. "="   ( Direct model binding / two-way binding )
3. "&"   ( Behaviour binding / Method binding  )

Check the below JSFiddle; I'll explain the difference between each of them.

{% jsfiddle shidhincr/q3kex/6/  %}


If you're confused by seeing the code, please have a look at the below link:

[AngularJS directives: Isolated scope prefixes ](http://umur.io/angularjs-directives-using-isolated-scope-with-attributes/) . This explains the isolated scope prefixes clearly; So I don't need to repeat the same here.

In the above fiddle, I've created 3 prefixes using "@" , "=" and "&".  Since I'm not appending any attribute name after these, AngularJS maps the `scope` property to the attribute with the same name in the directive.

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

- Since `name` is a property mapped with "@" prefix, any changes in the parent `scope` will reflect in the directive; but not vice versa. Try clicking the header, we can see that the `name` gets reversed in both parent `scope` and directive. But changing the name inside the textbox will not change the `name` inside the header. One more important thing about "@" prefix is, it's always expect the attribute value to be an expression. That means the `name` attribute value should be wrapped inside `{% raw %}{{}}{% endraw %}`.

- The second one is `color` attribute. This property is mapped with a "=" prefix, thus enables two-way binding between the parent and child `scope`. Try clicking the "randomize color" text, we can see that the color gets changed inside the directive's textbox also. The same way, changing the color inside the textbox will make the parent `scope` color also to be changed. "=" prefixes cannot be evaluated to an expression. This means the attribute value should not be wrapped inside the `{% raw %}{{}}{% endraw %}` but to be given as the property name only.

- Third one is the `reverse` attribute prefixed with "&". The "&" prefix enables to the directive `scope` to bind any methods of the parent `scope`. So directive can invoke the parent `scope` methods directly. Try clicking on the button "**reverse name from directive**", we can see that the  `reverseName()` from the parent `scope` has been invoked. 

I tried to make this article  as much neat as I can. Hope everyone enjoyed reading it. If I would've made any mistakes/ personal opinions , please point out in the comment section. 











