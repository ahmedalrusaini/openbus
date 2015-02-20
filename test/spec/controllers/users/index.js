'use strict';

describe('Controller: UsersIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var UsersIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersIndexCtrl = $controller('UsersIndexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
