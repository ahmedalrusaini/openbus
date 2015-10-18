'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsEditCtrl
 * @description
 * # ServiceRequestsEditCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
.controller('ServiceRequestsEditCtrl', function ($scope, $location, $translate, $routeParams, $uibModal, Account, Employee, Units, ServiceRequest, Notification) {
    Units.api.time.query().$promise.then(function(units){
      $scope.estTimeUnits = units;
    });
    
    ServiceRequest.Statuses.query().$promise.then(function(statuses) {
      $scope.statuses = statuses;
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
      
      $scope.request.startDate = moment(request.startDate).format("DD/MM/YYYY")
      
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
      var modal = $uibModal.open({
        templateUrl: 'accountSearchModal.html',
        controller: 'AccountSearchModalCtrl',
      });
    
      modal.result.then(function(account) {
        $scope.request.account = account;
        $scope.requestForm.$setDirty(true);
      });
    };
  
    $scope.openEmployeeSearchModal = function() {
      var modal = $uibModal.open({
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
    
    $scope.isStartDateReadonly = function() {
      return $scope.request.status !== "open"
    }
});
