'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsShowCtrl
 * @description
 * # ServiceRequestsShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsShowCtrl', function ($scope, $location, $translate, $routeParams, $uibModal, Account, Employee, ServiceRequest, Notification) {
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
    
    $scope.openFollowupModal = function() {
      var modal = $uibModal.open({
        templateUrl: 'followupModal.html',
        controller: 'FollowupModalCtrl',
        resolve: {
          $followups: function() {
            return [{
              id: "1",
              title: "Confirm Service Request",
              url: "/"
            }];
          }
        }
      });
    
      modal.result.then(function(fup) {
         $location.path(fup.url).search({account: account.id});
      }, function() {});
    };
  });