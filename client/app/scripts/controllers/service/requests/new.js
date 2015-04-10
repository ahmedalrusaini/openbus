'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsNewCtrl
 * @description
 * # ServiceRequestsNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsNewCtrl', function ($scope, $location, Account, $modal) {
    
    var accountId = $location.search().account;
    $scope.request = { };
        
    if (accountId) {
      Account.api.get({id: accountId}).$promise.then(function(account) {
        $scope.request.account = account;
      });
    }
    
    $scope.isSaveDisabled = function (form) {
      return !form.$dirty && !form.$valid;
    }
    
    $scope.cancel = function() {
      $location.path('/service/requests');
    }
    
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
