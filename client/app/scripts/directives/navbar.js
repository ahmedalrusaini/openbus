'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('openbusApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/layout/navbar.html',
      restrict: 'E'
    };
  })
  .controller('NavbarCtrl', function($rootScope, $scope, $location, Auth) {
    
    $scope.menu = $rootScope.menu || {};
    
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;  
    $scope.logout = Auth.logout;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
        
  });
