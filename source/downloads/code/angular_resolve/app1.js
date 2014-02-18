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
