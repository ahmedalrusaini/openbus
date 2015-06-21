'use strict';

/**
* @ngdoc function
* @name openbusApp.controller:AccountsShowCtrl
* @description
* # AccountsShowCtrl
* Controller of the openbusApp
*/
angular.module('openbusApp')
.controller('AccountsShowCtrl', function ($scope, $routeParams, $location, $translate, Account, TableCommon, ShowEditToggle, $modal, Notification, uiGmapGoogleMapApi, ServiceRequest) {
  TableCommon.init($scope);
  ShowEditToggle.init($scope, $location);
  
  var addressesChanged = false;
  
  Account.api.get({id: $routeParams.id}).$promise.then(function(account) {
    $scope.account = account;
    $scope.accountSafe = angular.copy(account);
    $scope.displayedAddresses = [].concat($scope.account.addresses);
    
    if($scope.account.address) {
      $scope.account.address.countryName = i18n.getCountryName($scope.account.address.country);
      
      var url = 'http://maps.google.com/maps/api/geocode/json?address=' + $scope.account.address.text;

      $.get(url, function(data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
      
        uiGmapGoogleMapApi.then(function(maps) {
          $scope.map = { 
            center: { latitude: lat, longitude: lng }, 
            zoom: 15,
            marker: {
              idkey: 1,
              coords: { latitude: lat, longitude: lng }
            }
          };
        });
      });
    }
    
    $scope.getServiceRequests();
  });
  
  Account.Types.query().$promise.then(function(types) {
    $scope.types = types;
  });

  $scope.followups = [{
    id: "1",
    title: "Create service request",
    url: "/service/requests/new"
  }];

  $scope.getServiceRequests = function() {
    ServiceRequest.api.query({'account.id': $scope.account.id, _limit: 10}).$promise.then(function(requests){      
      $scope.account.serviceRequests = requests;
      $scope.stSafeRequests = requests;
    });
  };
    
  $scope.submit = function (form) {
    Notification.init();
    form.$submitted = true;
    
    if (form.$valid) {
      $scope.account.$update({},
        function (account, responseHeaders) {
          $scope.account = account;
          $scope.accountSafe = angular.copy(account);
          
          $translate('messages.account.success.updated', {
            account: $scope.account.name
          }).then(function (msg) {
            Notification.add('success', msg);
            if (!$scope.account.address) {
              Notification.add('warning', 'No default address set!');
            }
          });
          
          $scope.displayedAddresses = [].concat($scope.account.addresses);
          addressesChanged = false; 
        },
        function (httpResponse) {
          $scope.errors = httpResponse.data.errors;
          var message = httpResponse.data.message;
          Notification.add('danger', message );
        });
    }
  };

  $scope.cancel = function () {
    $location.path("/accounts/" + $scope.account.id);
  };
  
  $scope.delete = function (account) {
    if (confirm("Delete account?")) {
      Notification.init();
      
      Account.api.delete(account, function () {
        $translate('messages.account.success.deleted', {
          account: account.name
        }).then(function (msg) {
          Notification.add('success', msg);
        });
          
        $location.path("/accounts").search({ hasAlerts: true });
      }, function (err) {
        Notification.add('danger', 'messages.account.danger.deleted');
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
    address.isSelected = true;
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
      size: 'lg',
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
            address.isSelected = false;
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