'use strict';

var express = require('express');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var _ = require('lodash');
var i18n = require('i18n');

var router = express.Router();

router.get('/', auth.isAuthenticated(), function(req, res){
  var roles = [];
  _.each(config.userRoles, function(role) {    
    roles.push({
      id: role,
      name: res.__("user.roles."+role)
    });
  });
    
  res.status(200).json(roles);
});

module.exports = router;