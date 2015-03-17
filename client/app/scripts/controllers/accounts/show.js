'use strict';

/**
* @ngdoc function
* @name openbusApp.controller:AccountsShowCtrl
* @description
* # AccountsShowCtrl
* Controller of the openbusApp
*/
angular.module('openbusApp')
.controller('AccountsShowCtrl', function ($rootScope, $scope, $routeParams, $location, $translate, Account, ShowEditToggle, TableCommon) {
  ShowEditToggle.init($scope, $location);
  TableCommon.init($scope);

  Account.api.get({id: $routeParams.id}).$promise.then(function(account) {
    $scope.account = account;
    $scope.accountSafe = angular.copy(account);
    $scope.address = $scope.account.address;
    $scope.stSafeAddresses = account.addresses;
  });
      
  Account.Types.query().$promise.then(function(types) {
    $scope.types = types;
  });

  $scope.followups = [{
    id: "1",
    title: "Create service request",
    url: "/service/requestes/new"
  }];
    
  $scope.submit = function (form) {
    $rootScope.initAlerts();
    form.$submitted = true;
    
    if (form.$valid) {  
      $scope.account.$update({},
        function (account, responseHeaders) {
          $scope.account = account;
          $scope.accountSafe = angular.copy(account);
          $translate('messages.account.success.updated', {
            account: $scope.account.name
          }).then(function (msg) {
            $rootScope.addAlert('success', msg);
          });
        },
        function (httpResponse) {
          $scope.errors = httpResponse.data.errors;
          var message = httpResponse.data.message;
          $rootScope.addAlert('danger', message );
        });
    }
  };

  $scope.cancel = function () {
    $location.path("/accounts/" + $scope.account.id);
  };
  
  $scope.select = function(index) {
    $scope.address = $scope.account.addresses[index];
    $scope.addressModal = angular.copy($scope.address);
  };
  
  $scope.createFollowup = function(id) {
    var fup = $.grep($scope.followups, function(fup){
      return fup.id === id;
    })[0];
    $location.path(fup.url);
  }
  
  $scope.saveAddressModal = function(form) {
    form.$submitted = true;
    $scope.dismiss();
    
    if(form.$valid) {
      for(var p in $scope.addressModal) {
        $scope.address[p] = $scope.addressModal[p];
      }
      
      if($scope.account.addresses.length === 0) {
        $scope.account.addresses.push($scope.address);
        console.log($scope.address);
      }
    }
  }
})