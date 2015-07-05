'use strict';

var express = require('express');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var _ = require('lodash');
var i18n = require('i18n');

var router = express.Router();

var types = ["responsible", "salesrep", "technician"];

router.get('/', auth.isAuthenticated(), function(req, res){
  var empRelsTypes = [];
  
  _.each(types, function(type) {    
    empRelsTypes.push({
      id: type,
      name: res.__("employee.relationship.type."+type)
    });
  });
  
  res.status(200).json(empRelsTypes);
});

module.exports = router;