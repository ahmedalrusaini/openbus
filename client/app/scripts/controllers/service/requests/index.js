'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:ServiceRequestsIndexCtrl
 * @description
 * # ServiceRequestsIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('ServiceRequestsIndexCtrl', function ($scope, ServiceRequest) {
    $scope.requests = ServiceRequest.api.query();
  });
