'use strict';

/**
* @ngdoc function
* @name openbusApp.controller:AccountsShowCtrl
* @description
* # AccountsShowCtrl
* Controller of the openbusApp
*/
angular.module('openbusApp')
.controller('AccountsShowCtrl', function ($scope, $routeParams, $modal, Account, uiGmapGoogleMapApi, ServiceRequest, Employee) {    
  var addressesChanged = false;
  
  $scope.i18n = i18n;
  
  Account.api.get({id: $routeParams.id}).$promise.then(function(account) {
    $scope.account = account;
    $scope.accountSafe = angular.copy(account);
  
    $scope.displayedAddresses = [].concat($scope.account.addresses);
    $scope.stEmployeeRelsSafe = [].concat($scope.account.employeeRels);
  
    if($scope.account.address) {
      $scope.account.address.countryName = i18n.getCountryName($scope.account.address.country);
    
      var url = 'http://maps.google.com/maps/api/geocode/json?address=' + $scope.account.address.text;

      $.get(url, function(data) {
        if (data.results && data.results[0]) {
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
        }
      });
    }
    
    $scope.getAddresses = function() {
      _.each($scope.account.addresses, function(addr) {
        if(addr.country) {
          addr.countryName = i18n.getCountryName(addr.country);
        }
      });
    };
        
    $scope.getEmployees = function() {
      angular.forEach($scope.account.employeeRels, function(rel) {
        Employee.api.get({id: rel.empid}).$promise.then(function(emp){
          rel.employee = emp;
          rel.employeeFullname = emp.fullname;
        });
      });
    };

    $scope.getServiceRequests = function(limit) {
      ServiceRequest.api.query({'account.id': $scope.account.id, _limit: limit}).$promise.then(function(requests){      
        $scope.account.serviceRequests = requests;
        $scope.stSafeRequests = requests;
      });
    };
    
    
    $scope.followups = [{
      id: "1",
      title: "Create service request",
      url: "/service/requests/new"
    }];
  
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
  
    $scope.openRelationshipModal = function(selectedRel) {
      $modal.open({
        templateUrl: 'employeeRespModal.html',
        controller: 'EmployeeRelModalCtrl',
        resolve: {
          relationship: function() {
            return selectedRel;
          },
          editMode: function() { return false; }
        }
      });    
    };
  });
})