/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var ServiceRequest = require('../api/service/request/request.model');
var Account = require('../api/account/account.model');
var Address = require('../api/account/address.model');

//Thing.find({}).remove(function() {
//  Thing.create({
//    name : 'Development Tools',
//    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//  }, {
//    name : 'Server and Client integration',
//    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//  }, {
//    name : 'Smart Build System',
//    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//  },  {
//    name : 'Modular Structure',
//    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//  },  {
//    name : 'Optimized Build',
//    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//  },{
//    name : 'Deployment Ready',
//    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//  });
//});

//ServiceRequest.find({}).remove(function(){
//  ServiceRequest.create({
//    description: 'Test request', 
//    estimatedTime: 10,
//    estimatedTimeUnit: 'H'
//  });
//});

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     email: 'admin@admin.com',
//     password: 'admin',
//     firstname: 'Gigi',
//     lastname: 'Pratone'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

// var account = new Account({
//     name: "Test Account",
//     addresses: [{
//     standard: true,
//     street: 'Via Larga',
//     city: 'Milan',
//     country: 'Italy'
//   }]
// });
//
// console.log(account);
//
// account.addresses.push({
//   standard: false,
//   street: 'Via Stretta',
//   city: 'Turin',
//   country: 'Italy'
// });
//
// Account.find({}).remove(function(){
//   Account.create(account);
// });
