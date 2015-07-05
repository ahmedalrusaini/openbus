'use strict';

describe('Controller: AccountsEditCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var AccountsEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountsEditCtrl = $controller('AccountsEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
