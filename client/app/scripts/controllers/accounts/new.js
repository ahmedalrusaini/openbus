'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AccountsNewCtrl
 * @description
 * # AccountsNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
.controller('AccountsNewCtrl', function ($scope, $rootScope, $location, Account, TableCommon, $translate, $modal) {
  $scope.account = { addresses: [] };
  $scope.editMode = true;
  
  TableCommon.init($scope);
  
  Account.Types.query().$promise.then(function(types) {
    $scope.types = types;
  });

  $scope.submit = function (form) {
    $rootScope.initAlerts();
        
    if (form.$valid) {
      Account.api.save($scope.account,
        function (account, responseHeaders) {            
          $translate('messages.account.success.created', {
            account: account.name
          }).then(function (msg) {
            $rootScope.addAlert('success', msg);
          });

          $location.path("/accounts/" + account.id).search({ hasAlerts: true });
        },
        function (httpResponse) {
          $scope.errors = httpResponse.data.errors;            
          var message = httpResponse.data.message || 'Account creation failed';
          $rootScope.addAlert('danger', message );
        });
    }
  };
  
  $scope.cancel = function() {
    $location.path("/accounts");
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
      
      $scope.displayedAddresses = [].concat($scope.account.addresses);
    }, function () {
      // console.log('Modal dismissed');
    });
  };
  
  $scope.isSaveDisabled = function (accountForm) {
    return !accountForm.$dirty;
  }
});