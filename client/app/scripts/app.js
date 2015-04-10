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
    'ngTouch',
    'ui.bootstrap.datetimepicker',
    'pascalprecht.translate',
    'ui.select',
    'smart-table'
  ])
  
  .config(function ($routeProvider, $locationProvider, $httpProvider, uiSelectConfig) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users/index.html',
        controller: 'UsersIndexCtrl'
      })
      .when('/users/new', {
        templateUrl: 'views/users/new.html',
        controller: 'UsersNewCtrl'
      })
      .when('/users/:id', {
        templateUrl: 'views/users/show.html',
        controller: 'UsersShowCtrl'
      })
      .when('/users/:id/edit', {
        templateUrl: 'views/users/edit.html',
        controller: 'UsersShowCtrl'
      })
      .when('/users/:id/:action', {
        templateUrl: 'views/users/show.html',
        controller: 'UsersShowCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/service/requests', {
        templateUrl: 'views/service/requests/index.html',
        controller: 'ServiceRequestsIndexCtrl'
      })
      .when('/service/requests/new', {
        templateUrl: 'views/service/requests/new.html',
        controller: 'ServiceRequestsNewCtrl'
      })
      .when('/accounts/new', {
        templateUrl: 'views/accounts/new.html',
        controller: 'AccountsNewCtrl'
      })
      .when('/accounts/:id', {
        templateUrl: 'views/accounts/show.html',
        controller: 'AccountsShowCtrl'
      })
      .when('/accounts/:id/edit', {
        templateUrl: 'views/accounts/edit.html',
        controller: 'AccountsShowCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts/index.html',
        controller: 'AccountsIndexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    uiSelectConfig.theme = 'bootstrap';
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
        } else {
          $rootScope.loggedUser = Auth.getCurrentUser();
        }
      });
    });
  });
