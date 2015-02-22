'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('AlertsCtrl', function ($rootScope) {
    $rootScope.alerts = [];
  
    $rootScope.initAlerts = function() {
      $rootScope.alerts = [];
    };
    
    $rootScope.addAlert = function(type, message){
      $rootScope.alerts.push({type: type, message: message});
    }; 
  
    $rootScope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
  
    $rootScope.$on('$routeChangeStart', function(event, next) {
      $rootScope.initAlerts();
    });
  });
