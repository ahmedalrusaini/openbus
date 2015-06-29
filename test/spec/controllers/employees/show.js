'use strict';

describe('Controller: EmployeesShowCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var EmployeesShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeesShowCtrl = $controller('EmployeesShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
