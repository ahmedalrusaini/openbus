'use strict';

describe('Controller: ServiceRequestsEditCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestsEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestsEditCtrl = $controller('ServiceRequestsEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
