'use strict';

var ServiceRequest = require('./request.model');
var config = require('../../../config/environment');
var i18n = require('i18n');
var _ = require('lodash');

var validationError = function(res, err) {
  if(err.errors) {
    _.each(ServiceRequest.schema.paths, function(prop) {
      if(err.errors.hasOwnProperty(prop.path)) {
        var error = err.errors[prop.path];
        if(error.message) {
          error.message = res.__(error.message);  
        }
      }
    })
  }
  
  var theErr = {
    message: err.message, //res.__(err.name),
    errors: err.errors
  };
  return res.status(422).json(theErr);
};

exports.index = function(req, res) {
  ServiceRequest.find({}, function (err, requests) {
    if(err) return res.status(500).json(err);
    res.status(200).json(requests);
  });
};