'use strict';

describe('Controller: ServiceRequestsIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestsIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestsIndexCtrl = $controller('ServiceRequestsIndexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
