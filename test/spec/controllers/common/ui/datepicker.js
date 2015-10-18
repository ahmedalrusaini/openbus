'use strict';

describe('Controller: CommonUiDatepickerctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('openbusApp'));

  var CommonUiDatepickerctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommonUiDatepickerctrlCtrl = $controller('CommonUiDatepickerctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
