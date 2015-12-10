'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsShowCtrl
 * @description
 * # ServiceRequestsShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsShowCtrl', function ($scope, $location, $translate, $routeParams, $uibModal, Account, Employee, ServiceRequest, ServiceRequestConfirmation, Notification, Units) {
    var followups = [];
    
    var getAccount = function(id) {
      Account.api.get({id: id}).$promise.then(function(account) {
        $scope.request.account = account;        
        $scope.request.account.technicianRels = _.filter(account.employeeRels, {type:'technician'});
        
        Units.api.time.query($scope.request.estimatedUnit).$promise.then(function(units){
          $scope.request.estimatedTimeUnitName = _.filter(units, {id: $scope.request.estimatedTimeUnit})[0].name;
        });
      });
    };
    
    var getEmployee = function(id) {
      Employee.api.get({id: id}).$promise.then(function(emp) {
        $scope.request.employee = emp;
      });
    }
    
    var getServiceReqConfirmation = function(id) {
      ServiceRequestConfirmation.api.get({confirmationId: id}).$promise.then(function(confirmation){
        $scope.request.confirmation = confirmation;
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
      
      if(request.confirmation && request.confirmation.id) {
        getServiceReqConfirmation(request.confirmation.id);
        
        followups = [{ 
          id: "1",
          title: "Service Request Confirmation",
          url: "/service/requests/" + $scope.request.id + "/confirmations/" + request.confirmation.id
        }];
      } else {
        followups = [{ 
          id: "1",
          title: "Confirm Service Request",
          url: "/service/requests/" + $scope.request.id + "/confirmations/new"
        }];
      }
    });
    
    $scope.openFollowupModal = function() {
      var modal = $uibModal.open({
        templateUrl: 'followupModal.html',
        controller: 'FollowupModalCtrl',
        resolve: {
          $followups: function() {
            return followups;
          }
        }
      });
    
      modal.result.then(function(fup) {
         $location.path(fup.url);
      }, function() {});
    };
  });