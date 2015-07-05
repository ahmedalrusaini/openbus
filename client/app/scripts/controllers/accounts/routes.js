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
        controller: 'AccountsEditCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts/index.html',
        controller: 'AccountsIndexCtrl'
      });
  });