'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:panel
 * @description
 * # panel
 */
angular.module('openbusApp')
  .controller('PanelCtrl', function($scope){
    var ctrl = this;
    
    ctrl.lazy = false;
    ctrl.pageHeader = false;
    ctrl.closable = true;
    
    ctrl.toggleBody = function() {
      if (ctrl.closable) {
        ctrl.lazy = !ctrl.lazy;
      }
    };
    
    ctrl.isClosable = function() {
      return ctrl.closable;
    };
    
    ctrl.isLazy = function() {
      return ctrl.lazy;
    };
    
    ctrl.isPageHeader = function() {
      return ctrl.pageHeader;
    };
  })
  .directive('panel', function () {
    return {
      templateUrl: 'views/directives/panel.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: 'PanelCtrl',
      scope: {
        lazy: '@',
        pageHeader: '@',
        closable: '@'
      },
      compile: function(elm, attrs, transclude) {
        return function postLink(scope, elm, attrs, panelCtrl) {
          if(angular.isDefined(scope.lazy)) {
            panelCtrl.lazy = (scope.lazy === 'true');
          }
          
          if(angular.isDefined(scope.pageHeader)) {
            panelCtrl.pageHeader = (scope.pageHeader === 'true');
          }
          
          if(angular.isDefined(scope.closable)) {
            panelCtrl.closable = (scope.closable === 'true');
          }
        }
      }
    };
  })
  .directive('panelHeading', function(){
    return {
      require: '^panel',
      templateUrl: 'views/directives/panel_heading.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        title: '@',
        isLazy: '&',
        isPageHeader: '&'
      },
      controller: function() {},
      compile: function(elm, attrs, transclude) {
        return function postLink(scope, elm, attrs, panelCtrl) {
          scope.isLazy = panelCtrl.isLazy;
          scope.toggleBody = panelCtrl.toggleBody;
          scope.isPageHeader = panelCtrl.isPageHeader;
          scope.isPanel = function() {
            return !panelCtrl.isPageHeader();
          },
          scope.isClosable = panelCtrl.isClosable;
        };
      }
    };
  })
  .directive('panelBody', function(){
    return {
      require: '^panel',
      templateUrl: 'views/directives/panel_body.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        fill: '@',
        isLazy: '&',
        isPageHeader: '&'
      },
      controller: function() {},
      compile: function(elm, attrs, transclude) {
        return function postLink(scope, elm, attrs, panelCtrl) {
          scope.isLazy = panelCtrl.isLazy;
          scope.isPageHeader = panelCtrl.isPageHeader;
        };
      }
    };
  });