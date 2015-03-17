'use strict';

/**
 * @ngdoc service
 * @name openbusApp.forms/editable
 * @description
 * # forms/editable
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('ShowEditToggle', function () {
    return {
      init: function(scope, location) {
        scope.editMode = /\/edit/.test(location.path());
        scope.toggleEditMode = function () {
          scope.editMode = !scope.editMode;
        }
        
        $("[data-toggle='tooltip']").tooltip();
      }
    }
  });
