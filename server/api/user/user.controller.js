'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var i18n = require('i18n');
var _ = require('lodash');
var extend = require('util')._extend;

var validationError = function(res, err) {
  if(err.errors) {
    _.each(User.schema.paths, function(prop) {
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

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  var query = {};
  
  query.firstname = new RegExp(req.query.firstname, "i");
  query.lastname = new RegExp(req.query.lastname, "i");
  query.email = new RegExp(req.query.email, "i");
  
  if(req.query.role) { query.role = req.query.role };
  
  var order = req.query.order || "email";

  User.find(query, '-salt -hashedPassword').sort(order).exec(function (err, users) {
    if(err) return res.status(500).json(err);
    
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = newUser.role || 'user';
    
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    res.json(user);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);

    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).json(err);
    return res.send(204);
  });
};

/**
 * Update user
 */
exports.update = function(req, res, next) {
  var userId = req.params.id;
  var props = req.body;
  
  User.findById(userId, function(err, user) {
    if (err) return validationError(res, err);
    user = extend(user, props);
    user.save();    
    res.send(user);
  });  
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  
  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).json({ message: res.__('user.messages.password.change')});
      });
    } else {
      res.status(403).json({ message: res.__('user.errors.password.change')});
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
