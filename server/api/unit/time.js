'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var _ = require('lodash');
var i18n = require('i18n');

var router = express.Router();

router.get('/', auth.isAuthenticated(), function(req, res){
  var units = [];
  
  units.push({id: "minutes", name: res.__("units.time.minutes")});
  units.push({id: "hours", name: res.__("units.time.hours")});
  units.push({id: "days", name: res.__("units.time.days")});
    
  res.status(200).json(units);
});

module.exports = router;