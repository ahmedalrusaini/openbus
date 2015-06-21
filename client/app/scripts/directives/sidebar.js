'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('openbusApp')
.controller('SidebarCtrl', ['$scope', '$rootScope', '$cookieStore', '$location', function SidebarCtrl($scope, $rootScope, $cookieStore, $location) {
  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];
        
  ctrl.select = function(selectedTab) {
    angular.forEach(tabs, function (tab) {
      if (tab.active && tab !== selectedTab) {
        tab.active = false;
        tab.onDeselect();
      }
    });
    selectedTab.active = true;
    selectedTab.onSelect();
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    // we can't run the select function on the first tab
    // since that would select it twice
    if (tabs.length === 1 && tab.active !== false) {
      tab.active = true;
    } else if (tab.active) {
      ctrl.select(tab);
    }
    else {
      tab.active = false;
    }
    
    // for (var t in tabs) {
    //   console.log(tabs[t].active);
    // }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && tabs.length > 1 && !destroyed) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };

  ctrl.navTo = function linkTo(url) {
    console.log("navto " + url);
    $location.path(url);
  };

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });
  
  $rootScope.sidebarOpened = true;
  
  $rootScope.toggleSidebar = function() {
    $rootScope.sidebarOpened = !$rootScope.sidebarOpened;
    $cookieStore.put('sidebarOpened', $rootScope.sidebarOpened);
  };
  
  ctrl.toggleSidebar = function() {
    $rootScope.toggleSidebar();
  };
  
  $rootScope.isSidebarOpened = function() {
    return $rootScope.sidebarOpened;
  };
  
  $scope.getWidth = function() {
    return window.innerWidth;
  };

  window.onresize = function() {
    $scope.$apply();
  };

  var mobileView = 992;
  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('sidebarOpened'))) {
        $rootScope.sidebarOpened = ! $cookieStore.get('sidebarOpened') ? false : true;
      } else {
        $rootScope.sidebarOpened = true;
      }
    } else {
      $rootScope.sidebarOpened = false;
    }
  });
}])

.directive('sidebar', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      heading: '@'
    },
    controller: 'SidebarCtrl',
    templateUrl: '/views/directives/sidebar.html'
  };
})

.directive('sbItem', ['$parse', '$log', function($parse, $log) {
  return {
    require: '^sidebar',
    restrict: 'EA',
    replace: true,
    templateUrl: '/views/directives/sidebar_item.html',
    transclude: true,
    scope: {
      active: '=?',
      heading: '@',
      icon: '@',
      navTo: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, sidebarCtrl) {
        scope.$watch('active', function(active) {
          if (active) {
            sidebarCtrl.select(scope);
          }
        });

        scope.disabled = false;
        if ( attrs.disable ) {
          scope.$parent.$watch($parse(attrs.disable), function(value) {
            scope.disabled = !! value;
          });
        }

        // Deprecation support of "disabled" parameter
        // fix(tab): IE9 disabled attr renders grey text on enabled tab #2677
        // This code is duplicated from the lines above to make it easy to remove once
        // the feature has been completely deprecated
        if ( attrs.disabled ) {
          $log.warn('Use of "disabled" attribute has been deprecated, please use "disable"');
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if ( !scope.disabled ) {
            scope.active = true;
          }
        };

        sidebarCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          sidebarCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    }
  };
}])

.directive('sbMain', ['$parse', '$log', function($parse, $log) {
  return {
    require: '^sidebar',
    restrict: 'EA',
    replace: true,
    templateUrl: '/views/directives/sidebar_main.html',
    transclude: true,
    scope: {
      heading: '@',
      navTo: '@',
      icon: '@',
      onSelect: '&select'
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, sidebarCtrl) {
                
        scope.select = function() {
          // sidebarCtrl.toggleSidebar();
          sidebarCtrl.navTo(scope.navTo);
        };
      };
    }
  };
}])

.directive('sbTitle', ['$parse', '$log', function($parse, $log) {
  return {
    require: '^sidebar',
    restrict: 'EA',
    replace: true,
    templateUrl: '/views/directives/sidebar_title.html',
    scope: {
      heading: '@'
    }
  };
}])

.directive('sbHeadingTransclude', [function() {
  return {
    restrict: 'A',
    require: '^sbItem',
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
}])

.directive('sbContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^sidebar',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.sbContentTransclude);
      
      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
  
  function isTabHeading(node) {
    return node.tagName &&  (
      node.hasAttribute('tab-heading') ||
      node.hasAttribute('data-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' ||
      node.tagName.toLowerCase() === 'data-tab-heading'
    );
  }
});