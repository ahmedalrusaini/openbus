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
      .when('/employees', {
        templateUrl: 'views/employees/index.html',
        controller: 'EmployeesIndexCtrl'
      })
      .when('/employees/new', {
        templateUrl: 'views/employees/new.html',
        controller: 'EmployeesNewCtrl'
      })
      .when('/employees/:id', {
        templateUrl: 'views/employees/show.html',
        controller: 'EmployeesShowCtrl'
      })
      .when('/employees/:id/edit', {
        templateUrl: 'views/employees/edit.html',
        controller: 'EmployeesEditCtrl'
      })
      .when('/employees/:id/:action', {
        templateUrl: 'views/employees/show.html',
        controller: 'EmployeesShowCtrl'
      })
  });