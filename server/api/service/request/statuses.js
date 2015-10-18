'use strict';

var express = require('express');
var auth = require('../../../auth/auth.service');
var _ = require('lodash');
var i18n = require('i18n');

var router = express.Router();

var statuses = ["open", "prog", "canc", "clos"];

router.get('/', auth.isAuthenticated(), function(req, res){
  var srvRequestStatuses = [];
  
  _.each(statuses, function(stat) {    
    srvRequestStatuses.push({
      id: stat,
      name: res.__("status." + stat)
    });
  });
  
  res.status(200).json(srvRequestStatuses);
});

module.exports = router;