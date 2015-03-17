'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AccountsIndexCtrl
 * @description
 * # AccountsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('AccountsIndexCtrl', function ($scope, Account, TableCommon) {
    $scope.accounts = Account.api.query().$promise.then(function(data){
      TableCommon.init($scope);
      
      $scope.accounts = data;
      $scope.stSafeAccounts = data;
    });
  });
