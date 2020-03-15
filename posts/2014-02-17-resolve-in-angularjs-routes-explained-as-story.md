---
layout: post
title: "'Resolve' in AngularJS routes, explained as story"
date: 2014-02-17 
comments: true
published: true
permalink: 2014/02/17/resolve-in-angularjs-routes-explained-as-story/
categories: 
- AngularJS
- routes
- resolve
- Promises
- $q
---

I feel AngularJS documentation is baffling sometimes. Reason may be,  I'm going through the same [learning curve](http://www.bennadel.com/blog/2439-My-Experience-With-AngularJS-The-Super-heroic-JavaScript-MVW-Framework.htm) described by [@bennadel](https://twitter.com/bennadel). Through this article, I'm primarily aiming to help those who got stuck at some point of the curve. Don't take it too seriously; I'm just sharing some of my experiences with AngularJS.
<!-- more -->
Recently, I was learning how routes work in AngularJS, and how they talk to the controller ..etc. Then I observed the controller initialisation can differ based on the route configurations and events like `$routeChangeSuccess` and `$routeChangeError` are fired accordingly. Most of these are achieved by a `resolve` attribute of  the route configuration object. Here, I'll explain it through 3 versions of a story.

## The Story

On one day, I was planning for a trip to a Switzerland. So I called the tour coordinator who makes the arrangements to this place. He explained the itinerary and hotel details clearly, so I asked him to make the necessary arrangements. After that, it's the tour coordinator's responsibility to book the room and make other required set-ups for my trip. Finally, I did a trip to Switzerland.

Let's convert this to AngularJS context.  Now we have: 

- `visitplace` is our first route.
- The place, its surroundings and the hotel room are the contents of our template. Let's add it to `placetovisit.html`.
- Tour coordinator is the one who connects to the place, so we have a controller called `TourCoordinatorCtrl`.

```js
"use strict";

var app = angular.module( "app", [ ] );

app.config( function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl"
  } );
} );

app.factory( "accommodation", function( ) {
  return {
    hotelName: function( ) {
      return "Some Hotel";
    },
    roomNo: function( ) {
      return "203";
    }
  };
} );

app.controller( "TourCoordinatorCtrl", function( $scope, accommodation ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  $scope.hotel = accommodation.hotelName( );
  $scope.roomno = accommodation.roomNo( );
});
```

And the templates `placetovisit.html` and `index.html` :

```html
<h1>Trip details</h1>
<div>
    <h2>Hi, {{name}}. Welcome to {{place}}</h2>
    <div>The accomodation is arranged on <strong>{{hotel}}</strong> and room number is <strong>{{roomno}}</strong></div>    
</div
```
**index.html**

```html 
<!doctype html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<title>AngularJS Resolve routes example</title>
</head>
<body>
	<a href="#/visitplace">I want to go for a trip</a>
	<div ng-view></div>
<script src="https://ajax.googleapis.com/ajax/libs/AngularJS/1.0.1/angular.min.js"></script>
<script src="app.js"></script>
</body>
</html>
```
Everything works as expected when we navigate to the route `/visitplace`. If you notice, the tour controller has a dependency on `accommodation` service. But it's just the controller's responsibility to find the hotel and room details. Also, getting the hotel and room details are completely synchronous events. That means, the room will be arranged before I reach the place.

But what if they're asynchronous events? Let's think this way: What If the tour coordinator is not so professional and he forgot to book the hotel and room. Because of this, when I arrive at the place, I'd to wait till I get a new room. Similarly, in the code, we can see that the view is rendered, but the `getHotel()` and `getRoom()` methods taking extra time to get the room details. 

```js
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
This is not ideal in sometimes. I've to render the view and wait for some of the data to be loaded. In my case, it's like I already started the trip and reached the place; but I'm waiting in the place to get my accommodation. This is really annoying ! Is there any way to make sure that these dependencies are resolved before I start my journey ? Let's see :

## Version 2 of the Story

This time, I've a friend who is a hotel owner in Switzerland. He is a close friend of mine, so I can ask him for a room at any time. If I do this, I don't need to depend upon the accommodation provided by tour coordinator. Finally, all I have to do is, to make sure that I myself resolve the accommodation problem and tell the tour coordinator to arrange the rest. 

This is exactly what we need if the route itself needs to resolve some dependencies in our application. For this, Angular provides a configuration on the `$routeProvider` service, called as `resolve`.  The resolve property is an optional map object / [ array of existing service names ]. All the keys of the map object can be injected to the controller as a dependency. The key would be a simple string, and its value can be either a function or string. If string is provided, Angular will assume that it's an existing service and inject that particular service to the controller. If the value is a function, it will act as a factory function and the return value will be injected to the controller. 

Let's relate our current story to Angular's context by using this resolve object. Look at our modified application code:

```js
"use strict";
var app = angular.module( "app", [ ] , function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl",
    resolve: {
      "myFriendsHotel": function( ) {
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
<div class="info">
Note: When controller is defined in the route, never initialise it again through ng-controller. That might throw an error when used with resolve configuration.
</div>

By doing this way, we can make sure that the controller initialisation is delayed till the hotel is ready. The view will be rendered only when the controller is initialised and a `$routeChangeSuccess` event will be fired. Also notice that, finding a hotel is a synchronous action; it means, since my friend is a hotel owner, I got a room immediately. In real world applications, most of the times we're going to deal with asynchronous actions. Let's move to the 3rd version of the story to sort that out.

## Final version of the Story

Last time we saw that I'd a friend who was a hotel owner. But in this version of the story, there is no hotel owner. This time, I've another friend in Switzerland who knows some of the hotel owners and he can find me a better room for cheaper cost. Once I call him and tell that my requirements, he'll take some time to talk to his friends and arrange me a room. The time cannot be predictable; because my friend will ask his friends, and his friends may talk to their friends, and it can go on like this. But when I called him first, he gave me back a promise that he will surely update the status –– so that I can set up the rest. So, only when I get an update from him, I am going to call up the tour coordinator and ask him to set up the rest of arrangements.

Let's see the final version of our code  in Angular:

```js
"use strict";
var app = angular.module( "app", [ ] , function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl",
    resolve: {
      "accommodation": function( $q, $timeout ) {
        var myFriend = $q.defer();        
        $timeout(function(){
          myFriend.resolve({
            hotelName: function( ) {
              return "My Friend's friend's hotel";
            },
            roomNo: function( ) {
              return "404";
            }
          });
        },5000);
        return myFriend.promise;
      }
    }
  });
} );
app.controller( "TourCoordinatorCtrl", function( $scope, accommodation ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  $scope.hotel = accommodation.hotelName( );
  $scope.roomno = accommodation.roomNo( );
} );
```
Closely look at each lines and see the differences from the previous one. Did you notice that, this time we've defined a variable `myFriend` inside the resolve function and initialised it using `$q.defer()`. The **$q** is the implementation of *Promises* API in AngularJS. It's inspired by the "**Q**" library implementation by kriskowal ( [link](https://github.com/kriskowal/q) here ). If you don't know what a *Promise* is, then you should definitely check it out [here](http://12devs.co.uk/articles/promises-an-alternative-way-to-approach-asynchronous-javascript/).

What happens here is : Our resolve function has created the variable `myFriend` and it immediately returned the `myFriend.promise`. This means, we know that something is going to happen later and `myFriend` will update the result of that action to the promise returned. The action can be either successful or a failure. For a successful action, the promise will be resolved with the hotel room data; and for the failure action, the promise will be rejected with data ( mostly the error message ).

When the factory function returns a promise, the controller initialisation will wait till the promise gets resolved/rejected. Once the promise is resolved, the controller will be initialised and the resolved data will be injected to the controller. In our case, it's the `accommodation` object; after this, a `$routeChangeSuccess` event will be fired. There're also chances that, the first promise can return another promise. In that case, our controller initialisation will be delayed till all the promises are resolved. At any point, if any of the promises are rejected, the controller will not be initialised; instead a `$routeChangeError` event will be fired.

The `resolve` is very useful if we need to load some data upfront before the controller initialisation and rendering the view. In real world applications, the `$timeout` can be replaced with a `$http` object to load data from server. Since it's an asynchronous event, we can always make sure that our view will be rendered with proper data.

## That's the End of All Stories

I tried to make these as clear I can. Hope everybody understood the concept of resolve in AngularJS routes. Feel free to comment for any improvements/ suggestions. Thanks for reading !






