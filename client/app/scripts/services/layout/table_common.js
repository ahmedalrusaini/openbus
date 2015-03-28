'use strict';

/**
 * @ngdoc service
 * @name openbusApp.tables/tableFilters
 * @description
 * # TableCommon
 * Service in the openbusApp. 
 * Add filtering scoping functionality, times function
 * to fill empty tables rows in pagination
 */
angular.module('openbusApp')
  .service('TableCommon', function () {
    return {
      init: function(scope) {
        scope.showInlineFilters = false;
  
        scope.toggleInlineFilters = function() {
          scope.showInlineFilters = !scope.showInlineFilters;
        };
        
        scope.times = function(num) {
          if(num <= 0) {
            return [];
          }
          
          return new Array(num);
        }
  
        $("[data-toggle='tooltip']").tooltip();
      }
    }
  });
