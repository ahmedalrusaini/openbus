'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsIndexCtrl
 * @description
 * # ServiceRequestsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsIndexCtrl', function ($scope, $cookieStore, $location, $translate, ServiceRequest,  Account, $uibModal, Notification) {
    
    $scope.dateOperators = [
      { id: 'eq', name: 'operator.eq.short'}, 
      { id: 'gt', name: 'operator.gt.short'},
      { id: 'gte', name: 'operator.gte.short'},
      { id: 'lt', name: 'operator.lt.short'},
      { id: 'lte', name: 'operator.lte.short'},
      { id: 'bt', name: 'operator.bt.short'}
    ];
    
    $scope.query = { }
    
    $scope.itemsByPage = $cookieStore.get('srvReqSrcResIBP') || 5;
    $scope.setItemsByPage = function(itemsByPage) {
      $scope.itemsByPage = itemsByPage;
      $cookieStore.put('srvReqSrcResIBP', itemsByPage);
    };
    
    var accountId = $location.search().account;
    
    var getServiceRequests = function() {
      ServiceRequest.api.query($scope.query).$promise.then(function(requests){
        angular.forEach(requests, function(req, key, obj) {
          Account.api.get({id: req.account.id}).$promise.then(function(account) {
            req.account = account;
            req.accountName = account.name;
          });
        })
      
        $scope.requests = requests;
        $scope.stSafeRequests = requests;
      });
    };
    
    getServiceRequests();
    
    $scope.delete = function (request) {
      if (confirm("Delete request?")) {
        Notification.init();
        
        var index = $scope.stSafeRequests.indexOf(request);
        $scope.stSafeRequests.splice(index, 1);
        
        ServiceRequest.api.delete(request, function () {
          $translate('messages.service.request.success.deleted')
            .then(function (msg) {
              Notification.add('success', msg);
            });
                      
        }, function (err) {
          Notification.add('danger', 'messages.request.danger.deleted');
        });
      }
    };
    
    $scope.searchRequests = function() {
      getServiceRequests();
    };
    
    $scope.clearAccount = function() {
      $scope.account = {};
      delete $scope.query["account.id"];
    };
    
    $scope.clearForm = function() {
      $scope.account = {};
      $scope.query = {};
      getServiceRequests();
    };
    
    $scope.openAccountSearchModal = function() {
      var modal = $uibModal.open({
        templateUrl: 'accountSearchModal.html',
        controller: 'AccountSearchModalCtrl',
      });
    
      modal.result.then(function(account) {
        if(account) {
          $scope.query["account.id"] = account.id;
        } else {
          delete $scope.query["account.id"];
        }
        $scope.account = account;
      });
    };
  });
