---
layout: post
title: "Repeating Multiple Elements using ng-repeat-start and ng-repeat-end in AngularJS"
date: 2015-04-10
author: Shidhin C R
comments: true
published: true
permalink: 2015/04/10/repeating-multiple-elements-using-ng-repeat-start-and-ng-repeat-end-in-angularjs/
categories:
- AngularJS
- ng-repeat
- ng-repeat-start
- ng-repeat-end
---
When the AngularJS [website](http://www.angularjs.org) is released, the TODO example in their website was one of the main attractions. The example was simple and just below 30 lines of code ( Here is the [link](https://jsfiddle.net/1waxcf9x/)  if you want to check ). The whole trick behind the scene was done by a directive named **ng-repeat**, as shown below:
<!-- more -->
```javascript
ng-repeat="todo in todoList.todos"
```
Till Angular 1.2, ng-repeat was designed to work on a single DOM element. In other words, ng-repeat can repeat only the DOM element on which it is added. Therefore, some of the situations -- see below -- lead Angular community to think about modifying ng-repeat in version 1.2. In the next section, we'll see the problem with ng-repeat and the solutions introduced.

### What was the issue ?

Consider the model like this:

```js
$scope.data = [{
    name: 'Shidhin',
    info: 'I am from Dubai'
}, {
    name: 'Someone',
    info: 'I am from New york'
}]
```
And assume if we need an output like this:

```html
<table>
    <tr>
        <td>Shidhin</td>
    </tr>
    <tr>
        <td>I am from Dubai</td>
    </tr>
    <tr>
        <td>Someone</td>
    </tr>
    <tr>
        <td>I am from New york</td>
    </tr>
</table>
```

The fundamental problem here is, the `TR` tag cannot be grouped in another element other than `TABLE`. Since creating each `TABLE` for each `TR` is not feasible, it is difficult to create the above mark-up using ng-repeat.

### What changed in Angular 1.2

From Angular version 1.2 onwards, ng-repeat got two siblings directives named `ng-repeat-start` and `ng-repeat-end`. With these, we can explicitly specify the starting and ending for ng-repeat. So, instead of using the ng-repeat directive on one single DOM element, we can specify the ng-repeat-start and ng-repeat-end on any two DOM elements.

These directives do the same job as ng-repeat -- it uses the same expressions as ng-repeat  -- but the main difference is, it **repeats all DOM elements** between the starting element and ending element (including the starting and ending tags).

Let's implement the above example with these new directives:

```html
{%raw%}
<table>
    <tr ng-repeat-start="d in data">
        <td>{{d.name}}</td>
    </tr>
    <tr ng-repeat-end>
        <td>{{d.info}}</td>
    </tr>
</table>
{%endraw%}
```
The above code will generate the desired output. You can see a [DEMO](//jsfiddle.net/shidhincr/3eLp5u6m/1/) here

<iframe class="embedd-iframe" src="//jsfiddle.net/shidhincr/3eLp5u6m/1/embedded/js,html,css,result/" ></iframe>

### Summary

Angular community had done a great job by introducing **ng-repeat-start** and **ng-repeat-end** directives. They're really powerful and solve some of the short-comings of the ng-repeat directive. I hope this article will help you for start using ng-repeat effectively in your next project. Thanks for reading!
