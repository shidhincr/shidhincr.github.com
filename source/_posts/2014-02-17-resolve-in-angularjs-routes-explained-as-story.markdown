---
layout: post
title: "'Resolve' in AngularJs routes, explained as story"
date: 2014-02-17 11:09
comments: true
published: false
categories: 
- AngularJs
- routes
- resolve
---

I found AngularJs documentation is baffling sometimes. May be because I'm going through the same learning curve as shown [here](http://www.bennadel.com/blog/2439-My-Experience-With-AngularJS-The-Super-heroic-JavaScript-MVW-Framework.htm). Anyways, I want to share my experiences with others who follows the same curve; hence this article.

Recently, I was learning how the routes works in AngularJs, and how they talk to the controller ..etc. Then I learnt how AngularJs allows to load some dependencies before the controller is instantiated and before the `routeChangeSuccess` event occurs. This is achieved by providing some special configurations to the `$routeProvider` objects called as `resolve`. I'm going to explain about this as 3 different versions of a story.

## The Story

It's a very simple story: On one day, I wanted to plan a trip Switzerland. I called up the tour coordinator who makes the arrangements to this place. When I asked, he explained the itinerary and hotel details, and finally I paid the tour coordinator for my travel arrangements. After that, it was tour coordinator's responsibility to book the available room and make other required set up for my trip. Once everything is done, the tour coordinator informed me, and I could able to complete my trip with out any problems.

Let's convert this to AngularJs context.  First start with the routes: So we'll add a simple route address `visitplace` to render our place. Think of the place and it's surroundings, and the hotel room as the template ( html ). Finally we have the Tour coordinator as our controller. The code might looks like this now:

{% include_code Application angular_resolve/app.js %}

Here are our templates `placetovisit.html` and `index.html` :

{% include_code Template angular_resolve/placetovisit.html %}

```html Index.html
<!doctype html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<title>AngularJs Resolve routes example</title>
</head>
<body>
	<a href="#/visitplace">I want to go for a trip</a>
	<div ng-view></div>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js"></script>
<script src="app.js"></script>
</body>
</html>
```
Everything works as expected. If you notice, the tour controller has a dependency on `accommodation` service. But it's just the controller's responsibility to find the hotel and room details. Here, getting the hotel & room details are synchronous events. That means, before I arrive the place, the room and hotel are ready.

But what if they're asynchronous events. Let's think this way: If the tour coordinator is going to book the hotel and room only when I arrive the place. That means, the view is rendered, but the `getHotel()` and `getRoom()` methods are doing some ajax calls to get the details. 

```javascript
"use strict";
var app = angular.module( "app", [ ] );
app.config( function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl"
  } );
} );
app.factory( "accommodation", function( $timeout ) {
  return {
    hotelName: function( scope ) {
      $timeout(function(){
        scope.hotel = "Some hotel";
      },3000);
      return "---";
    },
    roomNo: function( scope ) {
      $timeout(function(){
        scope.roomno = "103";
      },3000);
      return "---";
    }
  };
} );
app.controller( "TourCoordinatorCtrl", function( $scope, accommodation ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  $scope.hotel = accommodation.hotelName( $scope );
  $scope.roomno = accommodation.roomNo( $scope );
} );
```
This is not ideal right ? I've to render the view and wait for some of the data to be loaded. In my case, it's like I already started the trip and reached the place; but I'm waiting in the place to get my accommodation. This is really bad ! Is there any way to make sure that these dependencies are resolved before I start my journey ? Let's see :

## Version 2 of the Story

This time, I've a friend who is a hotel owner in Switzerland. He is a very close friend of mine, so I can ask him for a room at any time. If I do this, I don't need to depend upon the accommodation provided by my tour coordinator. Finally, all I have to do is, to make sure that I myself resolve the accommodation problem and tell the tour coordinator to arrange the rest. 

This is exactly what we need if the route itself needs to resolve some dependencies in the AngularJs application. For this, Angular provides a configuration on the `$routeProvider` service, called as `resolve`.  The resolve property is an optional map object / array of existing service names. All the keys of the map object can be injected to the controller as a dependency. The key would be a simple string, and it's value can be either a function or string. If string is provided, Angular will assume that it's an existing service and inject that particular service to the controller. If the value is a function, it will act as a factory function and the return value will be injected to the controller. 

Let's relate our current story to Angular's context by using this resolve object. Look at our modified application code:

```javascript
"use strict";
var app = angular.module( "app", [ ] , function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl",
    resolve: {
      "myFriendsHotel": function myFriendsHotel( ) {
        return {
          hotelName: function( ) {
            return "My Friend's hotel";
          },
          roomNo: function( ) {
            return "100";
          }
        };
      }
    }
  });
} );
app.controller( "TourCoordinatorCtrl", function( $scope, myFriendsHotel ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  $scope.hotel = myFriendsHotel.hotelName( );
  $scope.roomno = myFriendsHotel.roomNo( );
} );
```
*Note: When controller is defined in the route, never add it to the html element using ng-controller. That might throw an error when using resolve configuration.




