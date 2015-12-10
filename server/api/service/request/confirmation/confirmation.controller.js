'use strict';

var ServiceRequestConfirmation = require('./confirmation.model');
var ServiceRequest = require('../request.model');
var config = require('../../../../config/environment');
var i18n = require('i18n');
var _ = require('lodash');
var extend = require('util')._extend;

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
    message: res.__(err.name),
    errors: err.errors
  };
  return res.status(422).json(theErr);
};

exports.index = function(req, res) {
  
};

exports.show = function (req, res, next) {
  ServiceRequestConfirmation.findById(req.params.id, function (err, request) {
    if (err) return next(err);
    if (!request) return res.send(401);
    res.json(request);
  });
};

exports.create = function (req, res, next) {
  var newObj = new ServiceRequestConfirmation(req.body);
  
  newObj.save(function(err, obj) {
    if (err) return validationError(res, err);
    res.json(obj);
    
    ServiceRequest.findById(newObj.request.id, function (err, request) {
      request.confirmation.id = newObj.id;
      request.save();
    });
  });
};

exports.update = function(req, res, next) {
  
};

exports.destroy = function(req, res) {
  
};