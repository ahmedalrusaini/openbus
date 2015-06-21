'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, User, $translate, $filter, TableCommon, Notification) {    
    TableCommon.init($scope);
    
    var getData = function() {
      User.api.query().$promise.then(function(data){
        $scope.users = data;
        $scope.stSafeUsers = data;
      });
    };
    
    getData();
    
    $scope.refresh = function() {
      getData();
    };
  
    $scope.delete = function (user) {
      if (confirm("Delete user?")) {
        Notification.init();
        
        var i = $scope.stSafeUsers.indexOf(user);
        $scope.stSafeUsers.splice(i, 1);
        
        User.api.delete(user, function () {
          $translate('messages.user.success.deleted', {
            user: user.fullname || user.email
          }).then(function (msg) {
            Notification.add('success', msg);
          });
          
        }, function (err) {
          Notification.add('danger', 'messages.user.danger.deleted');
        });
      }
    };
    
  });
