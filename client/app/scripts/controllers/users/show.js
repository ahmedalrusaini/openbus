'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersShowCtrl
 * @description
 * # UsersShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
.controller('UsersShowCtrl', function ($scope, $routeParams, $location, $translate, User, $locale, Notification, $uibModal, Employee) {
  var getEmployee = function(id) {
    Employee.api.get({id: id}).$promise.then(function(emp) {
      $scope.user.employee = emp;
    });
  }
  
  User.api.get({ id: $routeParams.id }).$promise.then(function(user) {
    $scope.user = user;
    
    if($scope.user.employee && $scope.user.employee.id) {
      getEmployee($scope.user.employee.id);
    }
  });
  
  User.Roles.query().$promise.then(function(data){
    $scope.roles = data;
  });
  
  $scope.submit = function (form) {
    Notification.init();
    
    if (form.$valid) {
      $scope.user.$update({},
        function (user, responseHeaders) {
          $scope.user = user;
          console.log($scope.user)
          if($scope.user.employee && $scope.user.employee.id) {
            getEmployee($scope.user.employee.id);
          }
          
          $translate('messages.user.success.updated', {
            user: $scope.user.fullname || $scope.user.email
          }).then(function (msg) {
            Notification.add('success', msg);
          });
        },
        function (httpResponse) {
          $scope.errors = httpResponse.data.errors;
          var message = httpResponse.data.message || 'User update failed';
          Notification.add('danger', message );
        });
    }
  }

  $scope.cancel = function () {
    $location.path("/users/" + $routeParams.id);
  };
  
  $scope.delete = function (user) {
    if (confirm("Delete user?")) {
      Notification.init();
      
      User.api.delete(user, function () {
        $translate('messages.user.success.deleted', {
          user: user.fullname || user.email
        }).then(function (msg) {
          Notification.add('success', msg);
        });
        
        $location.path("/users").search({ hasAlerts: true });
      }, function (err) {
        Notification.add('danger', 'messages.user.danger.deleted');
      });
    }
  };
  
  $scope.isSaveDisabled = function (form) {
    return !form.$valid || !form.$dirty;
  };
  
  $scope.openEmployeeSearchModal = function() {
    var modal = $uibModal.open({
      templateUrl: 'employeeSearchModal.html',
      controller: 'EmployeeSearchModalCtrl',
    });
  
    modal.result.then(function(employee) {
      $scope.user.employee = employee;
      $scope.userForm.$setDirty(true);
    });
  };

  $scope.clearEmployee = function() {
    $scope.user.employee = {};
  };

});
