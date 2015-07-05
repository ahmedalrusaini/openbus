'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsShowCtrl
 * @description
 * # ServiceRequestsShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsShowCtrl', function ($scope, $location, $translate, $routeParams, $modal, ShowEditToggle, Account, Units, ServiceRequest, Notification) {
    ShowEditToggle.init($scope, $location);
    
    Units.api.time.query().$promise.then(function(units){
      $scope.estTimeUnits = units;
    });
    
    var getAccount = function(id) {
      Account.api.get({id: id}).$promise.then(function(account) {
        $scope.request.account = account;
      });
    };
    
    ServiceRequest.api.get({id: $routeParams.id}).$promise.then(function(request) {
      if(request.account.id) {
        getAccount(request.account.id);
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
      Notification.init();
      
      if(form.$valid) {
        $scope.request.$update({},
          function (request, responseHeaders) {
            $scope.request = request;
          
            $translate('messages.service.request.success.updated').then(function (msg) {
              Notification.add('success', msg);
              
              getAccount(request.account.id);
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
      });

    };
  
  });
