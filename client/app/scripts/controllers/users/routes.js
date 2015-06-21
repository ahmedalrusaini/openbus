'use strict';

/**
 * @ngdoc function
 * @name openbusApp.config
 * @description
 * # Routes
 * Application routes for resource
 */

angular.module('openbusApp')
  .config(function ($routeProvider){
    $routeProvider
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
  });