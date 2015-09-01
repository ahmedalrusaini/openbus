'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, $cookieStore, User, $translate, $filter,  Notification) { 
    $scope.query = {};
    
    User.Roles.query().$promise.then(function(data){
      $scope.roles = data;
    });
    
    $scope.itemsByPage = $cookieStore.get('usrSrcResIBP') || 5;
    $scope.setItemsByPage = function(itemsByPage) {
      $scope.itemsByPage = itemsByPage;
      $cookieStore.put('usrSrcResIBP', itemsByPage);
    };
    
    var getUsers = function() {
      User.api.query($scope.query).$promise.then(function(data){
        $scope.users = data;
        $scope.stSafeUsers = data;
      });
    };
    
    getUsers();
    
    $scope.refresh = function() {
      getUsers();
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
      
    $scope.search = function() {
      getUsers();
    };
    
    $scope.clearForm = function() {
      $scope.query = {}
      getUsers();
    };
    
  });
