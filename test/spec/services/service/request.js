'use strict';

describe('Service: service/request', function () {

  // load the service's module
  beforeEach(module('openbusApp'));

  // instantiate service
  var service/request;
  beforeEach(inject(function (_service/request_) {
    service/request = _service/request_;
  }));

  it('should do something', function () {
    expect(!!service/request).toBe(true);
  });

});
