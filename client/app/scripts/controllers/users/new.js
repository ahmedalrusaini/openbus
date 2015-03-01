'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersNewCtrl
 * @description
 * # UsersNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersNewCtrl', function ($rootScope, $scope, $location, User, $translate) {
    $scope.user = {}

    $scope.editMode = true;
    
    User.Roles.query().$promise.then(function(data){
      $scope.roles = data;
    });

    $scope.submit = function (form) {
      $rootScope.initAlerts();
      
      if ($scope.user.password !== $scope.user.password_confirmation) {
        form.password_confirmation.$setValidity("match", false);
      } else {
        form.password_confirmation.$setValidity("match", true);
      }

      if (form.$valid) {
        User.api.save($scope.user,
          function (user, responseHeaders) {            
            $translate('messages.user.success.created', {
                user: $scope.user.fullname || $scope.user.email
              })
              .then(function (msg) {
                $rootScope.addAlert('success', msg);
              });

            $location.path("/users/" + user.id);
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;            
            var message = httpResponse.data.message || 'User creation failed';
            $rootScope.addAlert('danger', message );
          });
      }
    };
  });
