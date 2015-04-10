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
  
  var addressesChanged = false;
  
  Account.api.get({id: $routeParams.id}).$promise.then(function(account) {
    $scope.account = account;
    $scope.accountSafe = angular.copy(account);
    $scope.displayedAddresses = [].concat($scope.account.addresses);
  });
  
  Account.Types.query().$promise.then(function(types) {
    $scope.types = types;
  });

  $scope.followups = [{
    id: "1",
    title: "Create service request",
    url: "/service/requests/new"
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
          
          $scope.displayedAddresses = [].concat($scope.account.addresses);
          addressesChanged = false; 
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
  
  $scope.delete = function (account) {
    if (confirm("Delete account?")) {
      $rootScope.initAlerts();
      
      Account.api.delete(account, function () {
        $translate('messages.account.success.deleted', {
          account: account.name
        }).then(function (msg) {
          $rootScope.addAlert('success', msg);
        });
          
        $location.path("/accounts").search({ hasAlerts: true });
      }, function (err) {
        $rootScope.addAlert('danger', 'messages.account.danger.deleted');
      });
    }
  };
  
  $scope.isSaveDisabled =   function (accountForm) {
    return !(accountForm.$dirty || addressesChanged) || !accountForm.$valid;
  }
  
  
  
  $scope.createFollowup = function(id) {
    var fup = $.grep($scope.followups, function(fup){
      return fup.id === id;
    })[0];

    $location.path(fup.url).search({account: $scope.account.id});
  };
    
  $scope.selectAddress = function(address) {
    $scope.openAddressModal(angular.copy(address));
  };
  
  $scope.deleteAddress = function(address) {
    var index = $scope.account.addresses.indexOf(address)
    $scope.account.addresses.splice(index, 1);
    addressesChanged = true;
  };
  
  $scope.openAddressModal = function(selectedAddress) {
    var isNew = !selectedAddress;
    var modal = $modal.open({
      templateUrl: 'addressModal.html',
      controller: 'AddressModalCtrl',
      resolve: {
        address: function() {
          return isNew ? {} : selectedAddress;
        },
        editMode: function() {
          return $scope.editMode;
        }
      }
    });
    
    modal.result.then(function(address) {
      if (isNew) {
        $scope.account.addresses.push(address);
      } else {
        $.grep($scope.account.addresses, function(addr, index) {
          if (addr.isSelected) {
            angular.copy(address, $scope.account.addresses[index]);
            return;
          }
        });
      }
      addressesChanged = true;
      
      $scope.displayedAddresses = [].concat($scope.account.addresses);
    }, function () {
      // console.log('Modal dismissed');
    });
  };

})