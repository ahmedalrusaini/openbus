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
    $scope.account = {};
    $scope.address = {};
    $scope.editMode = true;
    
    TableCommon.init($scope);
    
    Account.Types.query().$promise.then(function(types) {
      $scope.types = types;
    });

    $scope.submit = function (form) {
      $rootScope.initAlerts();
      
      form.$submitted = true;
      
      if (form.$valid) {
        Account.api.save($scope.account,
          function (account, responseHeaders) {            
            $translate('messages.account.success.created', {
                account: $scope.account.name
              })
              .then(function (msg) {
                $rootScope.addAlert('success', msg);
              });

            $location.path("/accounts/" + account.id);
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
    
    $scope.openAddressModal = function(isNew) {      
      var modal = $modal.open({
        templateUrl: 'addressModal.html',
        controller: 'AddressModalCtrl',
        resolve: {
          address: function() {
            
            return isNew ? {} : $scope.address;
          },
          editMode: function() {
            return $scope.editMode;
          }
        }
      });
      
      modal.result.then(function(address) {
        $scope.address = angular.copy(address);
        
        $scope.account.addresses.push($scope.address);      
      }, function () {
        console.log('Modal dismissed');
      });
    };
  });
  
