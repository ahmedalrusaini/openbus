'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsNewCtrl
 * @description
 * # ServiceRequestsNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsNewCtrl', function ($scope, $rootScope, $location, $translate, Account, Units, ServiceRequest, $modal) {
    
    var accountId = $location.search().account;
    $scope.request = { };
        
    if (accountId) {
      Account.api.get({id: accountId}).$promise.then(function(account) {
        $scope.request.account = account;
      });
    }
    
    Units.api.time.query().$promise.then(function(units){
      $scope.estTimeUnits = units;
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
      if (!$scope.request.startDate || !$scope.request.estimatedTime || !$scope.request.estimatedTimeUnit) {
        $scope.request.endDate = "";
        return;
      }
      
      $scope.request.endDate = moment($scope.request.startDate).add($scope.request.estimatedTime, $scope.request.estimatedTimeUnit).toDate();
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
      var modal = $modal.open({
        templateUrl: 'accountSearchModal.html',
        controller: 'AccountSearchModalCtrl',
      });
    
      modal.result.then(function(account) {
        $scope.request.account = account;
        $scope.account = account;
      });
    };
    
  });
