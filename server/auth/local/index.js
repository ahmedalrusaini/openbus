'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    
    if (error) {
      error.message = res.__(error.message);
      return res.status(401).json(error);
    }
    
    if (!user) {
      return res.status(404).json({message: res.__('general.error')});
    }

    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
    
  })(req, res, next)
});

module.exports = router;