'use strict';

describe('Controller: EmployeesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var EmployeesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeesEditCtrl = $controller('EmployeesEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
