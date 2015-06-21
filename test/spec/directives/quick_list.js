'use strict';

describe('Directive: quickList', function () {

  // load the directive's module
  beforeEach(module('openbusApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<quick-list></quick-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the quickList directive');
  }));
});
