'use strict';

describe('Controller: AccountsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var AccountsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountsNewCtrl = $controller('AccountsNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
