'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AccountsIndexCtrl
 * @description
 * # AccountsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('AccountsIndexCtrl', function ($scope, $rootScope, Account, TableCommon) {
    $scope.accounts = Account.api.query().$promise.then(function(data){
      TableCommon.init($scope);
      
      $scope.accounts = data;
      $scope.stSafeAccounts = data;
    });
    
    $scope.delete = function (account) {
      if (confirm("Delete account?")) {
        $rootScope.initAlerts()
        var index = $scope.stSafeAccounts.indexOf(account);
        $scope.stSafeAccounts.splice(index, 1);
        
        Account.api.delete(account, function () {
          $translate('messages.account.success.deleted', {
              account: account.name
            })
            .then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
                      
        }, function (err) {
          $rootScope.addAlert('danger', 'messages.account.danger.deleted');
        });
      }
    };
  });
