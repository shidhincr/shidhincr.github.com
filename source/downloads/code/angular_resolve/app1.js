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
