'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:accountSearchModal
 * @description
 * # accountSearchModal
 */
angular.module('openbusApp')
  .directive('accountSearchModal', function () {
    return {
      templateUrl: '/views/directives/account_search_modal.html',
      restrict: 'E'
    };
  })
  .controller("AccountSearchModalCtrl", function($scope, $modalInstance, Account){    
    
    $scope.accounts = Account.api.query().$promise.then(function(data){      
      $scope.accounts = data;
      $scope.stSafeAccounts = data;
    });
    
    $scope.cancelModal = function() {
      $modalInstance.dismiss('cancel');
    };
    
    $scope.selectAccount = function(account) {
      $modalInstance.close(account);
    }
    
  });
