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
  
  var query = {};
  query.description = new RegExp(req.query.description, "i"); 
  if(req.query["account.id"])  { query["account.id"] = req.query["account.id"] }
  
  var find = ServiceRequest.find(query);  
  if(req.query.startDate) {
    req.query.startDate = JSON.parse(req.query.startDate);
    
    switch (req.query.startDate.op) {
    case 'gt':
      find.where("startDate").gt(req.query.startDate.value);
      break;
    case 'gte':
      find.where("startDate").gte(req.query.startDate.value);
      break;
    case 'lt':
      find.where("startDate").lt(req.query.startDate.value);
      break;
    case 'lte':
      find.where("startDate").lte(req.query.startDate.value);
      break;
    case 'bt':
      find.where("startDate").gte(req.query.startDate.value).lte(req.query.startDate.valueTo);
      break;
    default:
      find.where("startDate").equals(req.query.startDate.value);
    }
  }
  
  find.limit(limit);
  
  find.exec(function (err, requests) {
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