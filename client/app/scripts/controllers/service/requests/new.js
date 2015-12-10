'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsNewCtrl
 * @description
 * # ServiceRequestsNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsNewCtrl', function ($scope, $rootScope, $location, $translate, Account, Employee, Units, ServiceRequest, $uibModal, Notification) {
    
    var accountId = $location.search().account;
    $scope.request = { };
     
    var getAccountEmployee = function() {
      var empid = $scope.request.employee && $scope.request.employee.id ? $scope.request.employee.id : _.filter($scope.request.account.employeeRels, {type: 'technician'})[0].empid
      Employee.api.get({id: empid}, function(employee){
        $scope.request.employee = employee;
      });
    };
       
    if (accountId) {
      Account.api.get({id: accountId}).$promise.then(function(account) {
        $scope.request.account = account;
        getAccountEmployee();
      });
    }
    
    Units.api.time.query().$promise.then(function(units){
      $scope.estTimeUnits = units;
    });
    
    $scope.$watch("confirmation.timeSpent", function(newValue, oldValue) {
      setEndDate();
    });
    
    $scope.$watch("confirmation.timeSpentUnit", function(newValue, oldValue) {
      setEndDate();
    });
    
    $scope.$watch("confirmation.endDate", function(newValue, oldValue) {
      setEndDate();
    });
      
    var setEndDate = function() {
      if (!$scope.confirmation.timeSpent || !$scope.confirmation.timeSpentUnit) {
        $scope.confirmation.endDate = "";
        return;
      }
      
      $scope.confirmation.endDate = moment($scope.confirmation.startDate).add($scope.confirmation.timSpent, $scope.confirmation.timeSpentUnit).toDate();
    };
    
    $scope.isSaveDisabled = function (form) {
      return !form.$dirty && !form.$valid;
    };
    
    $scope.submit = function(form) {
      Notification.init();
      
      if(form.$valid) {
        ServiceRequest.api.save($scope.request,
          function (request, responseHeaders) {            
            $translate('messages.service.request.success.created').then(function (msg) {
              Notification.add('success', msg);
            });

            $location.path("/service/requests/" + request.id).search({ hasAlerts: true });
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;            
            var message = httpResponse.data.message || 'Service Request creation failed';
            Notification.add('danger', message );
          });
      }
    };
    
    $scope.cancel = function() {
      $location.path('/service/requests');
    };
    
    $scope.clearAccount = function() {
      $scope.request.account = {};
    };
    
    $scope.openAccountSearchModal = function() {
      var modal = $uibModal.open({
        templateUrl: 'accountSearchModal.html',
        controller: 'AccountSearchModalCtrl',
      });
    
      modal.result.then(function(account) {
        $scope.request.account = account;
        $scope.account = account;
        getAccountEmployee();
      });
    };
    
    $scope.openEmployeeSearchModal = function() {
      var modal = $uibModal.open({
        templateUrl: 'employeeSearchModal.html',
        controller: 'EmployeeSearchModalCtrl',
      });
    
      modal.result.then(function(employee) {
        $scope.request.employee = employee;
      });
    };
  
    $scope.clearEmployee = function() {
      $scope.request.employee = {};
    };
    
  });
