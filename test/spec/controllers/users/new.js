'use strict';

describe('Controller: UsersNewCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var UsersNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersNewCtrl = $controller('UsersNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
