'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:alert
 * @description
 * # alert
 */
angular.module('openbusApp')
  .controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
    $scope.closeable = 'close' in $attrs;
    this.close = $scope.close;
  }])
  .directive('alert', function () {
    return {
      restrict:'EA',
      controller:'AlertController',
      templateUrl:'views/bootstrap/alert.html',
      transclude:true,
      replace:true,
      scope: {
        type: '@',
        close: '&'
      }
    }
  })
  .directive('dismissOnTimeout', ['$timeout', function($timeout) {
    return {
      require: 'alert',
      link: function(scope, element, attrs, alertCtrl) {
        $timeout(function(){
          alertCtrl.close();
        }, parseInt(attrs.dismissOnTimeout, 10));
      }
    }
  }]);
