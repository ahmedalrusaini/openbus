'use strict';

var ServiceRequest = require('./request.model');
var config = require('../../../config/environment');
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
  var count = req.query._count;
  if (count) {
    delete req.query._count;
    ServiceRequest.count(req.query, function(err, count) {
      res.status(200).json({count: count});
    });    
    return;
  }
  
  var limit = req.query._limit;
  delete req.query._limit;
  ServiceRequest.find(req.query).limit(limit).exec(function (err, requests) {
    if(err) return res.status(500).json(err);
    res.status(200).json(requests);
  });
};

exports.show = function (req, res, next) {
  var id = req.params.id;
  
  ServiceRequest.findById(id, function (err, request) {
    if (err) return next(err);
    if (!request) return res.send(401);
    res.json(request);
  });
};

exports.create = function (req, res, next) {
  var newObj = new ServiceRequest(req.body);
  
  newObj.save(function(err, obj) {
    if (err) return validationError(res, err);
    res.json(obj);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.id;
  var props = req.body;
  
  ServiceRequest.findById(id, function(err, request) {
    if (err) return validationError(res, err);
    request = extend(request, props);    
    request.save();    
    res.send(request);
  });  
};

exports.destroy = function(req, res) {
  ServiceRequest.findByIdAndRemove(req.params.id, function(err, request) {
    if(err) return res.status(500).json(err);
    return res.send(204);
  });
};