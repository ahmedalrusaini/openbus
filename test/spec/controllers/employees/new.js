'use strict';

describe('Controller: EmployeesNewCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var EmployeesNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeesNewCtrl = $controller('EmployeesNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
