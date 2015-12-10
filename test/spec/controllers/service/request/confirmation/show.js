'use strict';

describe('Controller: ServiceRequestConfirmationShowCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestConfirmationShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestConfirmationShowCtrl = $controller('ServiceRequestConfirmationShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
