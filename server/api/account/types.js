'use strict';

var express = require('express');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var _ = require('lodash');
var i18n = require('i18n');

var router = express.Router();

var types = ["organization", "person"];

router.get('/', auth.isAuthenticated(), function(req, res){
  var accountTypes = [];
  
  _.each(types, function(type) {    
    accountTypes.push({
      id: type,
      name: res.__("account.types."+type)
    });
  });
    
  res.status(200).json(accountTypes);
});

module.exports = router;