'use strict';

var express = require('express');
var controller = require('./confirmation.controller');
var config = require('../../../../config/environment');
var auth = require('../../../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;