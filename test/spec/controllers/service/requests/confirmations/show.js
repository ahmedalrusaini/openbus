'use strict';

describe('Controller: ServiceRequestsConfirmationsShowCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var ServiceRequestsConfirmationsShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceRequestsConfirmationsShowCtrl = $controller('ServiceRequestsConfirmationsShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
