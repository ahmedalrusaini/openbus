'use strict';

/**
* @ngdoc function
* @name openbusApp.controller:AccountsShowCtrl
* @description
* # AccountsShowCtrl
* Controller of the openbusApp
*/
angular.module('openbusApp')
.controller('AccountsShowCtrl', function ($rootScope, $scope, $routeParams, $location, $translate, Account, TableCommon, ShowEditToggle, $modal) {
  TableCommon.init($scope);
  ShowEditToggle.init($scope, $location);
  
  Account.api.get({id: $routeParams.id}).$promise.then(function(account) {
    $scope.account = account;
    $scope.accountSafe = angular.copy(account);
    $scope.selectedAddress = {};
    $scope.stSafeAddresses = $scope.account.addresses;
    $scope.addresses = $scope.account.addresses;
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
    $scope.selectedAddress = $scope.account.addresses[index];
    $scope.openAddressModal(false);
  };
  
  $scope.deleteAddress = function(address, index) {
    $scope.account.addresses.splice(index, 1);
  };
  
  $scope.createFollowup = function(id) {
    var fup = $.grep($scope.followups, function(fup){
      return fup.id === id;
    })[0];
    
    $location.path(fup.url);
  };  
  
  $scope.openAddressModal = function(isNew) {      
    var modal = $modal.open({
      templateUrl: 'addressModal.html',
      controller: 'AddressModalCtrl',
      resolve: {
        address: function() {
          return isNew ? {} : angular.copy($scope.selectedAddress);
        },
        editMode: function() {
          return $scope.editMode;
        }
      }
    });
    
    modal.result.then(function(address) {
      $scope.selectedAddress = angular.copy(address);
      var addr = $.grep($scope.addresses, function(addr, index) {
        if (addr.id === $scope.selectedAddress.id) {
          $scope.addresses[index] = $scope.selectedAddress;
          $scope.stSafeAddresses[index] = $scope.selectedAddress;
          return true;
        }
      });
  
      if (!addr[0]) {
        $scope.account.addresses.push($scope.selectedAddress);
      } 
      
    }, function () {
      // console.log('Modal dismissed');
    });
  };
})