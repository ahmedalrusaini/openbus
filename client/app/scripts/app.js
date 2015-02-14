'use strict';

/**
 * @ngdoc overview
 * @name openbusApp
 * @description
 * # openbusApp
 *
 * Main module of the application.
 */

angular
  .module('openbusApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        controller: 'LoginCtrl'
      })
      .when('/users/:id', {
        templateUrl: 'views/user/show.html',
        controller: 'UserCtrl'
      })
      .when('/users', {
        templateUrl: 'views/user/index.html',
        controller: 'UsersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        console.log("[app.js] authInterceptor responseError");
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  
  .run(function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (!loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
