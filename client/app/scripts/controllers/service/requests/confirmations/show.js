'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsConfirmationsShowCtrl
 * @description
 * # ServiceRequestsConfirmationsShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsConfirmationsShowCtrl', function ($scope, $routeParams, ServiceRequestConfirmation, ServiceRequest, Account, Employee, Units) {
    $scope.confirmation = { };
        
    ServiceRequestConfirmation.api.get({id: $routeParams.id, confirmationId: $routeParams.confirmationId}).$promise.then(function(confirmation) {
      $scope.confirmation = confirmation;
      
      ServiceRequest.api.get({id: $scope.confirmation.request.id}).$promise.then(function(request) {
        $scope.confirmation.request = request;
        
        Account.api.get({id: $scope.confirmation.request.account.id}).$promise.then(function(account){
          $scope.confirmation.request.account = account;
        });
      });
            
      Employee.api.get({id: $scope.confirmation.employee.id}).$promise.then(function(employee){
        $scope.confirmation.employee = employee;
      });        
      
      Units.api.time.query().$promise.then(function(units){
        $scope.confirmation.timeSpentUnitName = _.filter(units, {id: $scope.confirmation.timeSpentUnit})[0].name;
      });
      
      $scope.toggleQuickView = function() {
        $scope.quickViewOpen = !$scope.quickViewOpen;
      };
      
      $scope.isQuickViewOpen = function() {
        return $scope.quickViewOpen;
      };
      
    });
  });