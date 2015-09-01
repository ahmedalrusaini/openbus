'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:AccountsIndexCtrl
 * @description
 * # AccountsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('AccountsIndexCtrl', function ($scope, $cookieStore, Account, Notification, ServiceRequest, uiGmapGoogleMapApi) {
    $scope.query = { }
    
    Account.Types.query().$promise.then(function(types) {
      $scope.types = types;
    });
        
    var getAccounts = function() {
      Account.api.query($scope.query).$promise.then(function(data){
        $scope.accounts = data;
        $scope.stSafeAccounts = data;
        $scope.account = {};
      });
    };
        
    getAccounts();

    $scope.itemsByPage = $cookieStore.get('accSrcResIBP') || 5;
    $scope.setItemsByPage = function(itemsByPage) {
      $scope.itemsByPage = itemsByPage;
      $cookieStore.put('accSrcResIBP', itemsByPage);
    };
        
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
            if(data.results && data.results[0]) {
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
        
        $scope.getServiceRequests();
      }
    };
    
    $scope.searchAccounts = function() {
      getAccounts();
    };
    
    $scope.clearForm = function() {
      $scope.query = {}
      getAccounts();
    };
    
    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 15,
      bounds: {}
    };
    $scope.markers = [];
    $scope.toggleMap = function() {
      $scope.showMap = !$scope.showMap;
      
      if ($scope.showMap && $scope.markers.length === 0) {
        var idkey = 1;
        
        angular.forEach($scope.accounts, function(account) {
          if(account.address) {
            account.address.countryName = i18n.getCountryName(account.address.country);
            
            var url = 'http://maps.google.com/maps/api/geocode/json?address=' + account.address.text;

            $.get(url, function(data) {
              if (data.results && data.results[0]) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                uiGmapGoogleMapApi.then(function(maps) {
                  var marker = {
                    id: idkey++,
                    latitude: lat,
                    longitude: lng,
                    title: account.name
                  };
                  
                  $scope.markers.push(marker);
                });
              }
            });
          }
        });
      }
    };
  });
