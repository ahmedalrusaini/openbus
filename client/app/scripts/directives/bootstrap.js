'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:bootstrap
 * @description
 * # bootstrap
 */
angular.module('openbusApp')
  .directive('formGroup', function () {
    return {
      templateUrl: 'views/bootstrap/form_group.html',
      restrict: 'E',
      scope: {
        ngModel: '=',
        id: '@',
        label: '@',
        labelCol: '@',
        fieldCol: '@',
        disabled: '@',
        invalid: '@',
        dirty: '@', 
        errors: '='
      }
    };
  })
  .directive('formGroupButtons', function () {
    return {
      templateUrl: 'views/bootstrap/form_group_buttons.html',
      restrict: 'E',
      scope: {
        defBtnId: '@',
        defBtnTitle: '@',
        altBtnId: '@',
        altBtnTitle: '@',
        spacerCol: '@',
        buttonCol: '@',
      }
    }
  })
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
        }, parseInt(attrs.dismissOnTimeout, 5));
      }
    }
  }]);