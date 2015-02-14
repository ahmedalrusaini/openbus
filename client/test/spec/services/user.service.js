'use strict';

describe('Service: user.service', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var user.service;
  beforeEach(inject(function (_user.service_) {
    user.service = _user.service_;
  }));

  it('should do something', function () {
    expect(!!user.service).toBe(true);
  });

});
