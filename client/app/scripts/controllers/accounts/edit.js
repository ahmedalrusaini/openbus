'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AccountsEditCtrl
 * @description
 * # AccountsEditCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('AccountsEditCtrl', function ($scope, $rootScope, $routeParams, $location, $translate, Account, $uibModal, Notification, ServiceRequest, Employee) {    
    $scope.editMode = true;
    $scope.i18n = i18n;
        
    Account.api.get({id: $routeParams.id}).$promise.then(function(account) {
      $scope.account = account;
      $scope.accountSafe = angular.copy(account);
      $scope.displayedAddresses = [].concat($scope.account.addresses);
      $scope.stEmployeeRelsSafe = [].concat($scope.account.employeeRels);
    
      $scope.getEmployees = function() {
        angular.forEach($scope.account.employeeRels, function(rel) {
          Employee.api.get({id: rel.empid}).$promise.then(function(emp){
            rel.employee = emp;
            rel.employeeFullname = emp.fullname;
          });
        });
      };

      $scope.getAddresses = function() {
        _.each($scope.account.addresses, function(addr) {
          if(addr.country) {
            addr.countryName = i18n.getCountryName(addr.country);
          }
        });
      };
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
      Notification.init();
    
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
            $scope.accountForm.$setPristine();
            $location.path("/accounts/" + account.id).search({ hasAlerts: true });
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
      if(!accountForm) {
        accountForm = $scope.accountForm;
      }

      return accountForm.$pristine || !accountForm.$valid;
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
      $scope.accountForm.$pristine = false;
    };
  
    $scope.openAddressModal = function(selectedAddress) {
      var isNew = !selectedAddress;
      var modal = $uibModal.open({
        templateUrl: 'addressModal.html',
        controller: 'AddressModalCtrl',
        // size: 'lg',
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
        
        $scope.accountForm.$pristine = false;
        $scope.displayedAddresses = [].concat($scope.account.addresses);
      }, function () {
        // console.log('Modal dismissed');
      });
    };
    
    $scope.deleteRelationship = function(rel) {
      var index = $scope.account.employeeRels.indexOf(rel)
      $scope.account.employeeRels.splice(index, 1);
      $scope.stEmployeeRelsSafe = [].concat($scope.account.employeeRels);
      $scope.accountForm.$pristine = false;
    }
    
    $scope.editRelationship = function(rel) {
      rel.isSelected = true;
      $scope.openRelationshipModal(angular.copy(rel));
    };
    
    $scope.openRelationshipModal = function(selectedRel) {
      var isNew = !selectedRel;

      var modal = $uibModal.open({
        templateUrl: 'employeeRespModal.html',
        controller: 'EmployeeRelModalCtrl',
        resolve: {
          relationship: function() {
            return isNew ? {} : selectedRel;
          },
          editMode: function() {
            return $scope.editMode;
          }
        }
      });
    
      modal.result.then(function(rel) { 
        if (isNew) {
          $scope.account.employeeRels.push(rel);
        } else {
          angular.forEach($scope.account.employeeRels, function(r) {
            if(r.isSelected) {
              rel.isSelected = false;
              angular.copy(rel, r);
            }
          })
        }

        $scope.stEmployeeRelsSafe = [].concat($scope.account.employeeRels);
        $scope.accountForm.$pristine = false;
      }, function () {
        // console.log('Modal dismissed');
      });
    };
    
    $scope.$on('$routeChangeStart', function(event, next, current) { 
      if(!$scope.accountForm.$pristine) {
        if(!confirm("Some changes are not saved! Do you want to proceed?")) {
           event.preventDefault();
        }
      }
    });
    
  });
