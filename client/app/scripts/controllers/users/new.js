'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersNewCtrl
 * @description
 * # UsersNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersNewCtrl', function ($scope, $location, User, $translate, Notification) {
    $scope.user = {}

    $scope.editMode = true;
    
    User.Roles.query().$promise.then(function(data){
      $scope.roles = data;
    });
    
    $scope.submit = function (form) {
      Notification.init();
        
      var checkPasswordConfirmation = function() {
        if ($scope.user.password !== $scope.user.password_confirmation) {
          form.password_confirmation.$setValidity("match", false);
        } else {
          form.password_confirmation.$setValidity("match", true);
        }
      };
      
      checkPasswordConfirmation();
      
      if (form.$valid) {
        User.api.save($scope.user,
          function (user, responseHeaders) {            
            $translate('messages.user.success.created', {
                user: $scope.user.fullname || $scope.user.email
              })
              .then(function (msg) {
                Notification.add('success', msg);
              });

            $location.path("/users/" + user.id).search({ hasAlerts: true });
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;            
            var message = httpResponse.data.message || 'User creation failed';
            Notification.add('danger', message );
          });
      } else {
        $scope.$watch("user.password", checkPasswordConfirmation);
        $scope.$watch("user.password_confirmation", checkPasswordConfirmation);
      }
    };
    
    $scope.cancel = function() {
      $location.path("/users");
    };
    
    $scope.isSaveDisabled = function (form) {
      return !form.$valid;
    }
  });
