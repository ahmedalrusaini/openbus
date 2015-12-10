'use strict';

describe('Controller: ServiceRequestconfirmationCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestconfirmationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestconfirmationCtrl = $controller('ServiceRequestconfirmationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
