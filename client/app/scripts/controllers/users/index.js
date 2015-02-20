'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, User) {
    $rootScope.pageTitle = 'users';
    $scope.users = User.query();
  });
