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
} );
