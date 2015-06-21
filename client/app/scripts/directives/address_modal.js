'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:addressModal
 * @description
 * # addressModal
 */
angular.module('openbusApp')
  .directive('addressModal', function () {
    return {
      templateUrl: 'views/directives/address_modal.html',
      restrict: 'E'
    };
  })
  .controller("AddressModalCtrl", function($scope, $modalInstance, address, editMode, $modal){
    
    var formatAddressText = function() {
      $scope.addressModal.text = $scope.addressModal.street || "";
      if (address.house_no) $scope.addressModal.text += " " + $scope.addressModal.house_no;
      if (address.postal_code) $scope.addressModal.text += ($scope.addressModal.text ? ", " : "") + $scope.addressModal.postal_code;
      if (address.city) $scope.addressModal.text += ($scope.addressModal.text ? ", " : "") + $scope.addressModal.city;
      if (address.country) $scope.addressModal.text += ($scope.addressModal.text ? ", " : "") + $scope.addressModal.country;
    };
    
    $scope.countries = i18n.countries;
    $scope.addressModal = address;
    $scope.addressModal.countryName = i18n.getCountryName(address.country);
    
    $scope.editMode = editMode;
    
    $scope.cancelModal = function() {
      $modalInstance.dismiss('cancel');
    };
    
    $scope.saveModal = function(form) {
      if(form.$valid) {
        formatAddressText();
        $modalInstance.close($scope.addressModal);
        $scope.addressModal = {};
      }
    };
    
    $scope.isSaveDisabled = function (addressForm) {
      return !addressForm.$valid || !addressForm.$dirty;
    };
    
    $scope.countrySelected = function($item) {
      $scope.addressModal.country = $item.cca2;
    };
    
    $scope.openCountriesModal = function(selectedCountry, addressForm) {
      var modal = $modal.open({
        templateUrl: 'countriesModal.html',
        controller: 'CountriesModalCtrl',
        resolve: {
          country: selectedCountry
        }
      });
    
      modal.result.then(function(country) {
        $scope.addressModal.country  = country.cca2;
        $scope.addressModal.countryName  = country.name.common;
        addressForm.$setDirty(true);
      }, function(){
      
      });
    }
  });