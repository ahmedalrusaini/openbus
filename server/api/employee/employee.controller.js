'use strict';

var Employee = require('./employee.model');
var config = require('../../config/environment');
var _ = require('lodash');
var extend = require('util')._extend;

var validationError = function(res, err) {
  if(err.errors) {
    _.each(Employee.schema.paths, function(prop) {
      if(err.errors.hasOwnProperty(prop.path)) {
        var error = err.errors[prop.path];
        if(error.message) {
          error.message = res.__(error.message);  
        }
      }
    })
  }
  
  var theErr = {
    message: res.__(err.message),
    errors: err.errors
  };
  return res.status(422).json(theErr);
};

exports.index = function(req, res) {
  var query = {};  
  query.lastname = new RegExp(req.query.lastname, "i");
  if(req.query.street)  { query["address.street"] = new RegExp(req.query.street, "i") }
  if(req.query.city)  { query["address.city"] = new RegExp(req.query.city, "i") }
  
  Employee.find(query).sort("lastname").exec(function (err, employees) {
    if(err) return res.status(500).json(err);
    res.status(200).json(employees);
  });
  
};

exports.show = function(req, res) {
  var employeeId = req.params.id;
  Employee.findById(employeeId, function (err, employee) {
    if (err) return next(err);
    if (!employee) return res.send(401);
    res.json(employee);
  });
};

exports.create = function (req, res, next) {
  var newObj = new Employee(req.body);
  newObj.save(function(err, obj) {
    if (err) return validationError(res, err);
    res.json(obj);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;

  var props = req.body;
    
  Employee.findById(id, function(err, obj) {
    if (err) return new validationError(res, err);
    
    obj = extend(obj, props);  
    obj.save(function(err, obj) {
      if (err) return validationError(res, err);
      res.send(obj);
    });
  });
};

exports.destroy = function(req, res) {
  Employee.findByIdAndRemove(req.params.id, function(err, employee) {
    if(err) return res.status(500).json(err);
    return res.send(204);
  });
};
