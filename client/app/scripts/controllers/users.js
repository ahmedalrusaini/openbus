'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersCtrl', function ($rootScope, $scope, User) {
    $rootScope.pageTitle = 'users';
    
    $scope.users = User.query();
        
  });
