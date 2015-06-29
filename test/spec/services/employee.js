'use strict';

describe('Service: employee', function () {

  // load the service's module
  beforeEach(module('openbusApp'));

  // instantiate service
  var employee;
  beforeEach(inject(function (_employee_) {
    employee = _employee_;
  }));

  it('should do something', function () {
    expect(!!employee).toBe(true);
  });

});
