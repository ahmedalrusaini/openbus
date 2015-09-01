'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:countriesModal
 * @description
 * # countriesModal
 */
angular.module('openbusApp')
  .directive('countriesModal', function () {
    return {
      templateUrl: '/views/directives/countries_modal.html',
      restrict: 'E'
    };
  })
  .controller("CountriesModalCtrl", function($scope, $modalInstance, country){    
    $scope.countries = i18n.countries;
    
    $scope.cancelModal = function() {
      $modalInstance.dismiss('cancel');
    };
    
    $scope.selectCountry = function(country) {
      $modalInstance.close(country);
      $scope.countries = [];
    }
  });
