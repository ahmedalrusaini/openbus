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
    .when('/service/requests', {
      templateUrl: 'views/service/requests/index.html',
      controller: 'ServiceRequestsIndexCtrl'
    })
    .when('/service/requests/new', {
      templateUrl: 'views/service/requests/new.html',
      controller: 'ServiceRequestsNewCtrl'
    })
    .when('/service/requests/:id/edit', {
      templateUrl: 'views/service/requests/edit.html',
      controller: 'ServiceRequestsEditCtrl'
    })
    .when('/service/requests/:id', {
      templateUrl: 'views/service/requests/show.html',
      controller: 'ServiceRequestsShowCtrl'
    })
  });