'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsShowCtrl
 * @description
 * # ServiceRequestsShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsShowCtrl', function ($scope, $location, $translate, $routeParams, $modal, Account, Employee, Units, ServiceRequest, Notification) {    
    Units.api.time.query().$promise.then(function(units){
      $scope.estTimeUnits = units;
    });
        
    var getAccount = function(id) {
      Account.api.get({id: id}).$promise.then(function(account) {
        $scope.request.account = account;        
        $scope.request.account.technicianRels = _.filter(account.employeeRels, {type:'technician'});
      });
    };
    
    var getEmployee = function(id) {
      Employee.api.get({id: id}).$promise.then(function(emp) {
        $scope.request.employee = emp;
      });
    }
    
    ServiceRequest.api.get({id: $routeParams.id}).$promise.then(function(request) {
      $scope.request = request;
      
      if(request.account && request.account.id) {
        getAccount(request.account.id);
      }
      
      if(request.employee && request.employee.id) {
        getEmployee(request.employee.id);
      } else {
        getEmployee($scope.request.account.technicianRels[0].empid);
      }
    });
    
    $scope.$watch("request.estimatedTime", function(newValue, oldValue) {
      setEndDate();
    });
    
    $scope.$watch("request.estimatedTimeUnit", function(newValue, oldValue) {
      setEndDate();
    });
    
    $scope.$watch("request.startDate", function(newValue, oldValue) {
      setEndDate();
    });
    
    var setEndDate = function() {
      if (!$scope.request) return;
      if (!$scope.request.startDate || !$scope.request.estimatedTime || !$scope.request.estimatedTimeUnit) {
        $scope.request.endDate = "";
        return;
      }
      
      $scope.request.endDate = moment($scope.request.startDate).add($scope.request.estimatedTime, $scope.request.estimatedTimeUnit).toDate();
    };
    
    $scope.submit = function(form) {
      Notification.init();
      
      if(form.$valid) {
        $scope.request.$update({},
          function (request, responseHeaders) {
            $scope.request = request;
          
            $translate('messages.service.request.success.updated').then(function (msg) {
              Notification.add('success', msg);
              
              getAccount(request.account.id);
              getEmployee(request.employee.id);
            });
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;
            var message = httpResponse.data.message;
            Notification.add('danger', message );
          });
      }
    };
    
    $scope.cancel = function() {
      $location.path('/service/requests/' + $scope.request.id);
    };
    
    $scope.delete = function (request) {
      if (confirm("Delete request?")) {
        Notification.init()

        ServiceRequest.api.delete(request, function () {
          $translate('messages.service.request.success.deleted')
            .then(function (msg) {
              Notification.add('success', msg);
            });

          $location.path("/requests").search({ hasAlerts: true });
        }, function (err) {
          Notification.add('danger', 'messages.request.danger.deleted');
        });
      }
    };
    
    $scope.clearAccount = function() {
      $scope.request.account = {};
    };
    
    $scope.openAccountSearchModal = function() {
      var modal = $modal.open({
        templateUrl: 'accountSearchModal.html',
        controller: 'AccountSearchModalCtrl',
      });
    
      modal.result.then(function(account) {
        $scope.request.account = account;
        $scope.requestForm.$setDirty(true);
      });
    };
  
    $scope.openEmployeeSearchModal = function() {
      var modal = $modal.open({
        templateUrl: 'employeeSearchModal.html',
        controller: 'EmployeeSearchModalCtrl',
      });
    
      modal.result.then(function(employee) {
        $scope.request.employee = employee;
        $scope.requestForm.$setDirty(true);
      });
    };
  
    $scope.clearEmployee = function() {
      $scope.request.employee = {};
    };
  
    $scope.isSaveDisabled =   function (form) {
      return !form.$dirty || !form.$valid;
    };
  });
