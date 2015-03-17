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
    
    var submenu = function() {
      $scope.submenu = [];
      if($location.path().match(/\/users/)) {
        $scope.submenu.push({url: "/users", title: "menu.users.sub.index"});
        $scope.submenu.push({url: "/users/new", title: "menu.users.sub.new"});
      } 
      else if ($location.path().match(/\/service\/requests/)) {
        $scope.submenu.push({url: "/service/requests", title: "menu.service.requests.sub.index"});
        $scope.submenu.push({url: "/service/requests/new", title: "menu.service.requests.sub.new"});
      } 
      else if ($location.path().match(/\/accounts/)) {
        $scope.submenu.push({url: "/accounts", title: "menu.accounts.sub.index"});
        $scope.submenu.push({url: "/accounts/new", title: "menu.accounts.sub.new"});
      }
    };
  
    $scope.isCollapsed = true;
    $rootScope.isLoggedIn = Auth.isLoggedIn;
    $rootScope.isAdmin = Auth.isAdmin;
    $rootScope.getCurrentUser = Auth.getCurrentUser;  
    $scope.logout = Auth.logout;

    $scope.isActive = function(route) {
      if(route === '/') {
        return route === $location.path();
      } else {
        return $location.path().match(new RegExp(route));
      }
    };
  
    $scope.isSubActive = function(route) {
      if(route === '/') {
        return route === $location.path();
      } else {
        return $location.path().match(new RegExp(route+"$"));
      }
    };
  
    $scope.isHome = function() {
      return $location.path() === '/';
    }
  
    $rootScope.$on('$routeChangeStart', function(event, next) {
      submenu();
    });
  
    submenu();
        
  });
