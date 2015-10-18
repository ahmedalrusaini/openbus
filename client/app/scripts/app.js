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
    // 'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ui.select',
    'smart-table',
    'ui.bootstrap',
    'uiGmapgoogle-maps'
  ]) 
  .config(function ($routeProvider, $locationProvider, $httpProvider, uiSelectConfig, uiGmapGoogleMapApiProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    uiSelectConfig.theme = 'bootstrap';
    
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
    
    $translateProvider.useSanitizeValueStrategy('sanitize');
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
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (!loggedIn) {
          $location.path('/login');
        } else {
          $rootScope.loggedUser = Auth.getCurrentUser();
        }
      });
    });
    
    $rootScope.Utils = {
      times: function(num) {
        if(num <= 0) {
          return [];
        }
        
        return new Array(num);
      }
    };
  });
