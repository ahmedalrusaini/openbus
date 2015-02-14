'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the appApp
 */
angular.module('openbusApp')
  .controller('UserCtrl', function ($scope, $rootScope, $routeParams, $location, User) {
    $rootScope.pageTitle = "user";
    $scope.user = User.get({ id: $routeParams.id });
    console.log($scope.user);
    $scope.update = function(form) {
      $scope.user.$update({},
        function(value, responseHeaders){
          $scope.user = value;
        },
        function(httpResponse){

        });
    },
    
    $scope.cancel = function() {

    }
  });
