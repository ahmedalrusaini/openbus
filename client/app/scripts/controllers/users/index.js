'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, User, $translate) {
    $rootScope.pageTitle = 'users';
    $scope.users = User.api.query();

    $scope.delete = function (user, index) {
      if (confirm("Delete user?")) {
        $rootScope.initAlerts()
        User.api.delete(user, function () {
          $scope.users.splice(index, 1);
          
          $translate('messages.user.success.deleted', {
              user: user.fullname || user.email
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
