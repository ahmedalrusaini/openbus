'use strict';

describe('Service: forms/editable', function () {

  // load the service's module
  beforeEach(module('openbusApp'));

  // instantiate service
  var forms/editable;
  beforeEach(inject(function (_forms/editable_) {
    forms/editable = _forms/editable_;
  }));

  it('should do something', function () {
    expect(!!forms/editable).toBe(true);
  });

});
