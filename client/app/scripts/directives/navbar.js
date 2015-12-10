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
      templateUrl: 'views/directives/navbar.html',
      restrict: 'E'
    };
  })
  .controller('NavbarCtrl', function($rootScope, $scope, $location, Auth, Notification) {
    
    $scope.menu = $rootScope.menu || {};
  
    $scope.isCollapsed = true;
    $rootScope.isLoggedIn = Auth.isLoggedIn;
    $rootScope.isAdmin = Auth.isAdmin;
    $rootScope.getCurrentUser = Auth.getCurrentUser;  
    $scope.logout = Auth.logout;
    $rootScope.isMe = Auth.isMe;

    $scope.isActive = function(route) {
      if(route === '/') {
        return route === $location.path();
      } else {
        return $location.path().match(new RegExp(route));
      }
    };
    
    $scope.pageHasSidebar = function() {
      if($(".no-sidebar").length > 0) {
        return false;
      }
      return true;
    };
    
    $rootScope.$on('$routeChangeStart', function(event, next) {
      $scope.pageHasSidebar();
    });
  
    // $scope.isSubActive = function(route) {
    //   if(route === '/') {
    //     return route === $location.path();
    //   } else {
    //     return $location.path().match(new RegExp(route+"$"));
    //   }
    // };
  
    $scope.isHome = function() {
      return $location.path() === '/';
    }
  
    // $rootScope.$on('$routeChangeStart', function(event, next) {
    //   submenu();
    // });
    //
    // submenu();
    
  });