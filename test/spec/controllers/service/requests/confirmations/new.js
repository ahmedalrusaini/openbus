'use strict';

describe('Controller: ServiceRequestsConfirmationsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestsConfirmationsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestsConfirmationsNewCtrl = $controller('ServiceRequestsConfirmationsNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
