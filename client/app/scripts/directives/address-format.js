'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:address
 * @description
 * # address
 */
angular.module('openbusApp')
  .directive('addressFormat', function () {
    return {
      template: '<address><strong ng-show="heading">{{heading}}</strong><br ng-show="heading"><span></span</address>',
      restrict: 'E',
      scope: {
        heading: '=',
        model: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('model', function() {
          var addr = element.find("span");
          var text = "";
          
          if(scope.model) {
            text = scope.model.street || "";
            if (scope.model.houseNo) text += ", " + scope.model.houseNo;
            text += "<br>";
            if (scope.model.postalCode) text += scope.model.postalCode + " ";
            if (scope.model.city) text += scope.model.city;
            text += "<br>";
            if (scope.model.country) text += scope.model.countryName;
          }
          
          addr.html(text);
        });        
      }
    };
  });
