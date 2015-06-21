'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AccountsIndexCtrl
 * @description
 * # AccountsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('AccountsIndexCtrl', function ($scope, Account, TableCommon, Notification, uiGmapGoogleMapApi, ServiceRequest) {
    var getAccounts = function() {
      Account.api.query().$promise.then(function(data){
        TableCommon.init($scope);
  
        $scope.accounts = data;
        $scope.stSafeAccounts = data;
        $scope.account = {};
      });
    };
        
    $scope.accounts = getAccounts();
    
    $scope.refresh = function() {
      getAccounts();
    };
    
    
    $scope.delete = function (account) {
      if (confirm("Delete account?")) {
        Notification.init();
        var index = $scope.stSafeAccounts.indexOf(account);
        $scope.stSafeAccounts.splice(index, 1);
        
        Account.api.delete(account, function () {
          $translate('messages.account.success.deleted', {
              account: account.name
            })
            .then(function (msg) {
              Notification.add('success', msg);
            });
                      
        }, function (err) {
          Notification.add('danger', 'messages.account.danger.deleted');
        });
      }
    };
    
    $scope.getServiceRequests = function() {
      ServiceRequest.api.count().$promise.then(function(count) {
        console.log("Count: " + count);
      });
      
      ServiceRequest.api.query({'account.id': $scope.account.id}).$promise.then(function(requests){  
        $scope.account.serviceRequests = requests;
        $scope.stSafeRequests = requests;
      });
    }
    
    $scope.select = function (account) {
      if (!account.isSelected) {
        $scope.account = {};
      } else {
        $scope.account = account;
        
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
        
      }
    };
  });
