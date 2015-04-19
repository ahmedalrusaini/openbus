'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsIndexCtrl
 * @description
 * # ServiceRequestsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsIndexCtrl', function ($scope, $rootScope, ServiceRequest, TableCommon, Account) {
    TableCommon.init($scope);
    
    ServiceRequest.api.query().$promise.then(function(requests){
      angular.forEach(requests, function(req, key, obj) {
        Account.api.get({id: req.account.id}).$promise.then(function(account) {
          req.account.name = account.name;
        });
      })
      
      $scope.requests = requests;
      $scope.stSafeRequests = requests;
    });
    
    $scope.delete = function (request) {
      if (confirm("Delete request?")) {
        $rootScope.initAlerts()
        
        var index = $scope.stSafeRequests.indexOf(request);
        $scope.stSafeRequests.splice(index, 1);
        
        ServiceRequest.api.delete(request, function () {
          $translate('messages.service.request.success.deleted')
            .then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
                      
        }, function (err) {
          $rootScope.addAlert('danger', 'messages.request.danger.deleted');
        });
      }
    };
  });
