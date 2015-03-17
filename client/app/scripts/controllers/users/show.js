'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersShowCtrl
 * @description
 * # UsersShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')

  .controller('UsersShowCtrl', function ($scope, $rootScope, $routeParams, $location, $translate, User, ShowEditToggle) {
    ShowEditToggle.init($scope, $routeParams);
    
    $scope.user = User.api.get({ id: $routeParams.id });
    
    User.Roles.query().$promise.then(function(data){
      $scope.roles = data;
    });
    
    $scope.submit = function (form) {
      $rootScope.initAlerts();
      
      if (form.$valid) {  
        $scope.user.$update({},
          function (user, responseHeaders) {
            $scope.user = user;
            $translate('messages.user.success.updated', {
                user: $scope.user.fullname || $scope.user.email
              }).then(function (msg) {
                $rootScope.addAlert('success', msg);
              });
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;
            var message = httpResponse.data.message || 'User update failed';
            $rootScope.addAlert('danger', message );
          });
      }
    }

    $scope.cancel = function () {
      // $scope.toggleEditMode();
      // $scope.user = User.api.get({ id: $routeParams.id });
      $location.path("/users/" + $routeParams.id);
    };

  });
