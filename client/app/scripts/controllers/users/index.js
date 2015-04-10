'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, User, $translate, $filter, TableCommon) {    
    TableCommon.init($scope);
    
    User.api.query().$promise.then(function(data){
      $scope.users = data;
      $scope.stSafeUsers = data;
    });
  
    $scope.delete = function (user) {
      if (confirm("Delete user?")) {
        $rootScope.initAlerts();
        
        var i = $scope.stSafeUsers.indexOf(user);
        $scope.stSafeUsers.splice(i, 1);
        
        User.api.delete(user, function () {
          $translate('messages.user.success.deleted', {
            user: user.fullname || user.email
          }).then(function (msg) {
            $rootScope.addAlert('success', msg);
          });
          
        }, function (err) {
          $rootScope.addAlert('danger', 'messages.user.danger.deleted');
        });
      }
    };
    
  });
