'use strict';

describe('Controller: AccountsIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var AccountsIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountsIndexCtrl = $controller('AccountsIndexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
