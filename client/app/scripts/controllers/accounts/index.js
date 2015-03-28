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
    
    $scope.delete = function (account, index) {
      if (confirm("Delete account?")) {
        $rootScope.initAlerts()
        Account.api.delete(account, function () {
          $scope.accounts.splice(index, 1);
          
          $translate('messages.user.success.deleted', {
              account: account.name
            })
            .then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
                      
        }, function (err) {
          $rootScope.addAlert('danger', 'messages.user.danger.deleted');
        });
      }
    };
  });
