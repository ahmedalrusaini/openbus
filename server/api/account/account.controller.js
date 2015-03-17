'use strict';

var Account = require('./account.model');
var config = require('../../config/environment');
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
  delete props._id;
  
  Account.findById(id, function(err, obj) {
    if (err) return new validationError(res, err);
      
    for(var p in props) {
      if (p === 'addresses') {
        for (var a in props[p]) {
          var addrProps = props[p][a];
          
          var addr = _(obj.addresses).filter(function(addr) { return addr.id === addrProps.id }).value();
          
          // console.log("ADDR");
          // console.log(addr)
          // console.log("ADDRPROPS");
          // console.log(addrProps)
          
          for (var pa in addrProps) {
            console.log(pa);
            addr[0][pa] = addrProps[pa];
          }
          
          console.log(addr[0])
        }
      } else {
        obj[p] = props[p];
      }
    }

    obj.save();
    res.send(obj);
  });
}