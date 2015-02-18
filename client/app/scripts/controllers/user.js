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
    
    $scope.update = function(form) {
      $scope.user.$update({},
        function(user, responseHeaders){
          $scope.user = user;
          $scope.messages
        },
        function(httpResponse){

        });
    };
    
    $scope.cancel = function() {
      $scope.user = User.get({ id: $routeParams.id });
    };
    
    $scope.beforeRender = function($view, $dates, $leftDate, $upDate, $rightDate) {
      
    };
  });
