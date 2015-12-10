'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsConfirmationsNewCtrl
 * @description
 * # ServiceRequestsConfirmationsNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsConfirmationsNewCtrl', function ($scope, $routeParams, $location, ServiceRequest, Account, Employee, Units, ServiceRequestConfirmation, Notification, $translate) {
    ServiceRequest.api.get({id: $routeParams.id}).$promise.then(function(request) {
      $scope.confirmation = {
        request: request
      };
      
      $scope.confirmation.employee = request.employee;
      $scope.confirmation.startDate = moment(request.startDate).toDate();
      $scope.confirmation.endDate = moment(request.endDate).toDate();
      $scope.confirmation.timeSpent = request.estimatedTime;
      $scope.confirmation.timeSpentUnit = request.estimatedTimeUnit;
      
      var getAccount = function(id) {
        Account.api.get({id: id}).$promise.then(function(account) {
          $scope.confirmation.request.account = account;
        });
      };
    
      var getEmployee = function(id) {
        Employee.api.get({id: id}).$promise.then(function(emp) {
          $scope.confirmation.employee = emp;
        });
      }
      
      if(request.account && request.account.id) {
        getAccount($scope.confirmation.request.account.id);
      }
      
      if(request.employee && request.employee.id) {
        getEmployee($scope.confirmation.request.employee.id);
      } 
      
      Units.api.time.query().$promise.then(function(units){
        $scope.timeUnits = units;
        $scope.confirmation.timeSpentUnitName = _.filter(units, {id: $scope.confirmation.timeSpentUnit})[0].name;
        $scope.confirmation.request.estimatedTimeUnitName = _.filter(units, {id: $scope.confirmation.request.estimatedTimeUnit})[0].name;
      });
    
      $scope.$watch("confirmation.timeSpent", function(newValue, oldValue) {
        if(newValue !== oldValue) {
          setEndDate();
        }
      });
    
      $scope.$watch("confirmation.timeSpentUnit", function(newValue, oldValue) {
        if(newValue !== oldValue) {
          setEndDate();
        }
      });
    
      $scope.$watch("confirmation.endDate", function(newValue, oldValue) {
        if(newValue !== oldValue) {
           setTimeSpent();
        }
      });
      
      var setTimeSpent = function() {
        $scope.confirmation.timeSpent = moment($scope.confirmation.endDate).diff($scope.confirmation.startDate, $scope.confirmation.timeSpentUnit);
      }
      
      var setEndDate = function() {
        // if (!$scope.confirmation.timeSpent || !$scope.confirmation.timeSpentUnit) {
        //   $scope.confirmation.endDate = "";
        //   return;
        // }
        $scope.confirmation.endDate = moment($scope.confirmation.startDate).add($scope.confirmation.timeSpent, $scope.confirmation.timeSpentUnit).toDate();
      };
      
      $scope.isQuickViewOpen = function() {
        return $scope.quickViewOpen;
      };
    
      $scope.toggleQuickView = function() {
        $scope.quickViewOpen = !$scope.quickViewOpen;
      };
      
      $scope.submit = function(form) {
        Notification.init();
      
        if(form.$valid) {
          ServiceRequestConfirmation.api.save($scope.confirmation,
            function (confirmation, responseHeaders) {            
              $translate('messages.service.request.confirmation.success.created').then(function (msg) {
                Notification.add('success', msg);
              });

              $location.path("/service/requests/" + confirmation.request.id + "/confirmations/" + confirmation.id).search({ hasAlerts: true });
            },
            function (httpResponse) {
              $scope.errors = httpResponse.data.errors;            
              var message = httpResponse.data.message || 'Service Request Confirmation creation failed';
              Notification.add('danger', message );
            });
        }
      };
    
    });
            
  });
