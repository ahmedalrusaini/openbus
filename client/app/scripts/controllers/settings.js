'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('SettingsCtrl', function ($rootScope, $scope, Auth, $translate) {
    $scope.user = {};
    
    $scope.changePassword = function(form) {
      $rootScope.initAlerts();
      
      if ($scope.user.new_password !== $scope.user.password_confirmation) {
        form.password_confirmation.$setValidity("match", false);
      } else {
        form.password_confirmation.$setValidity("match", true);
      }
      
      if ($scope.user.new_password === $scope.user.password) {
        form.new_password.$setValidity("nochange", false);
      } else {
        form.new_password.$setValidity("nochange", true);
      }
      
      if(form.$valid) {
        Auth.changePassword($scope.user.password, $scope.user.new_password, function(res) {
          if(res.status === 403) {
            $rootScope.addAlert('danger', res.data.message);
          } else {
            $translate("messages.user.success.passwordChanged").then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
          }
        });
      }
    };
  });
