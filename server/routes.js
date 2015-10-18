/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var i18n = require('i18n');

module.exports = function(app) {
    
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  
  app.use('/api/users', require('./api/user'));
  app.use('/api/user/roles', require('./api/user/roles'));

  app.use('/api/employees', require('./api/employee'));
  app.use('/api/employee/reltypes', require('./api/employee/relationship_types'));

  app.use('/api/accounts', require('./api/account'));
  app.use('/api/account/types', require('./api/account/types'));
  
  app.use('/api/service/requests', require('./api/service/request'));
  app.use('/api/service/reqstat', require('./api/service/request/statuses'));

  app.use('/api/units/time', require('./api/unit/time'));
  
  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
    });
};
