/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var i18n = require('i18n');

module.exports = function(app) {
  var env = app.get('env');
	
	var allowCrossDomain = function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:9001');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Content-Type,Authorization');
    next();
  }

  
	app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
		app.use(allowCrossDomain);
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client/app-material')));
    app.set('appPath', path.join(config.root, 'client/app-material'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
  
  i18n.configure({
    locales: ['en', 'it'],
    directory: config.root + '/server/config/i18n',
    defaultLocale: 'en',
    objectNotation: true,
    updateFiles: false
  });
  
  app.use(i18n.init);
  
  app.use(function(req, res, next) {
    try {
      var appLocale = require(config.root + "/client/app-material/scripts/i18n/locale.js");
      res.setLocale(appLocale.language);  
    } catch(e) {}
    
    next();
  });
};
