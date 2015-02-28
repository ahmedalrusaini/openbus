'use strict';

describe('Controller: ServiceRequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestsCtrl = $controller('ServiceRequestsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
