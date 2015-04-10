'use strict';

var Account = require('./account.model');
var config = require('../../config/environment');
var _ = require('lodash');
var extend = require('util')._extend;

var validationError = function(res, err) {
  if(err.errors) {
    _.each(Account.schema.paths, function(prop) {
      if(err.errors.hasOwnProperty(prop.path)) {
        var error = err.errors[prop.path];
        if(error.message) {
          error.message = res.__(error.message);  
        }
      }
    })
  }
  
  console.log(err.message);
  
  var theErr = {
    message: res.__(err.message),
    errors: err.errors
  };
  return res.status(422).json(theErr);
};

exports.index = function(req, res) {
  Account.find({}, function (err, accounts) {
    if(err) return res.status(500).json(err);
    res.status(200).json(accounts);
  });
};

exports.show = function(req, res) {
  var accountId = req.params.id;
  Account.findById(accountId, function (err, account) {
    if (err) return next(err);
    if (!account) return res.send(401);
    res.json(account);
  });
};

exports.create = function (req, res, next) {
  var newObj = new Account(req.body);
  newObj.type = newObj.type || 'organization';
  
  newObj.save(function(err, obj) {
    if (err) return validationError(res, err);
    res.json(obj);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;

  var props = req.body;
    
  Account.findById(id, function(err, obj) {
    if (err) return new validationError(res, err);
    
    obj = extend(obj, props);  
    obj.save(function(err, obj) {
      if (err) return validationError(res, err);
      res.send(obj);
    });
  });
};

exports.destroy = function(req, res) {
  Account.findByIdAndRemove(req.params.id, function(err, account) {
    if(err) return res.status(500).json(err);
    return res.send(204);
  });
};
