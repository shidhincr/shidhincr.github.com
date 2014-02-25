---
layout: post
title: "AngularJS: Real time model persistence using local storage"
date: 2014-02-25 07:46
comments: true
published: true
categories: 
- AngularJS
- LocalStorage
---

Last week, I came across a situation while working on a simple AngularJS application. I'd to sync the data between multiple open tabs. As you guess,  the easy way to sync data between multiple tabs is through **local storage**. Ofcourse there are better ways of doing this using **websockets**; but here I am going to explain the client-side way –– using local storage and real time updating other tabs. 
<!--more-->

## The Code

I created a demo app in Plunker. Code is given below

```html index.html
<!DOCTYPE html>
<html ng-app="app">
<head>
  <script  src="http://code.angularjs.org/1.2.13/angular.js"></script>
  <link rel="stylesheet" href="style.css" />
  <script src="script.js"></script>
</head>
<body ng-controller="MaintCtrl as m">
  <h1>{{m.greeting}}</h1>
  <h2>Current LocalStorage value is = <em>{{m.latestData()}}</em></h2>
  <input type="text" ng-model="m.value">
  <input type="button" value="update" ng-click="m.update(m.value)">
</body>
</html>
```
And the JavaScript :

```javascript script.js
var app;
app = angular.module("app", []);
app.controller("MaintCtrl", function(LS) {
  this.greeting = "This is a localstorage demo app";
  this.value = LS.getData();
  this.latestData = function() {
    return LS.getData();
  };
  this.update = function(val) {
    return LS.setData(val);
  };
});
app.factory("LS", function($window, $rootScope) {
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    }
  };
});
```

The above shows a simple application that stores data in local storage. This works well when there's only one tab. Our challenge is to ensure the view is same when the application is opened in multiple tabs as well.

## The Technique 

Local storage provides an `event` called `storage` on window object. Whenever the localstorage gets updated, all the event listeners attached to `storage` gets invoked. The first parameter to the handler function is an event object which contains  an `event.key` pointing to the local storage value changed.

```javascript
angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
    }
  });
```

**$rootScope.$apply()**, will trigger a digest cycle from root scope, and all the views will be updated with the new model value.

Final JavaScript :

```javascript
var app;
app = angular.module("app", []);
app.controller("MaintCtrl", function(LS) {
  this.greeting = "This is a localstorage demo app";
  this.value = LS.getData();
  this.latestData = function() {
    return LS.getData();
  };
  this.update = function(val) {
    return LS.setData(val);
  };
});
app.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    }
  };
});
```

## Demo

Try opening the following link in multiple  tabs. Update the input text from different tabs, and you can see them updating the other tabs as well.

<a href="http://embed.plnkr.co/ThpFwX7BRhRhNWPuq5ap/preview" target="_blank">Angular LocalStorage Demo</a>