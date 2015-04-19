'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsShowCtrl
 * @description
 * # ServiceRequestsShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsShowCtrl', function ($scope, $rootScope, $location, $translate, $routeParams, $modal, ShowEditToggle, Account, Units, ServiceRequest) {
    ShowEditToggle.init($scope, $location);
    
    Units.api.time.query().$promise.then(function(units){
      $scope.estTimeUnits = units;
    });
    
    ServiceRequest.api.get({id: $routeParams.id}).$promise.then(function(request) {
      if(request.account.id) {
        Account.api.get({id: request.account.id}).$promise.then(function(account) {
          $scope.request.account.id = account.id;
          $scope.account = account;
        });
      }
      
      $scope.request = request;
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
      if(form.$valid) {
        console.log($scope.request);
        $scope.request.$update({},
          function (request, responseHeaders) {
            $scope.request = request;
          
            $translate('messages.service.request.success.updated').then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;
            var message = httpResponse.data.message;
            $rootScope.addAlert('danger', message );
          });
      }
    };
    
    $scope.cancel = function() {
      $location.path('/service/requests/' + $scope.request.id);
    };
    
    $scope.delete = function (request) {
      if (confirm("Delete request?")) {
        $rootScope.initAlerts()

        ServiceRequest.api.delete(request, function () {
          $translate('messages.service.request.success.deleted')
            .then(function (msg) {
              $rootScope.addAlert('success', msg);
            });

          $location.path("/requests").search({ hasAlerts: true });
        }, function (err) {
          $rootScope.addAlert('danger', 'messages.request.danger.deleted');
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
      });

    };
  
  });
