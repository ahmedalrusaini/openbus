'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var i18n = require('i18n');
var Address = require('../address/address.model');
var Employee = require('../employee/employee.model');
var _ = require('lodash');

var EmployeeRelSchema = new Schema ({
  type: { type: String, required: true},
  empid: mongoose.Schema.ObjectId
});

var AccountSchema = new Schema({
  name: String,
  type: { type: String, default: 'organization' },
  addresses: [Address.schema],
  employeeRels: [EmployeeRelSchema]
}, {
  toJSON: { virtuals: true }
});

AccountSchema
  .virtual('typename')
  .get(function () {
    return i18n.__("account.types." + this.type);
  });
  
AccountSchema
  .virtual('address')
  .get(function () {
    return this.addresses[_.findKey(this.addresses, function(address){
      return address.standard;
    })];
  });

AccountSchema.pre("save", function(next) {
  var account = this;
  
  var stdAddresses = _.filter(account.addresses, {standard: true});
  
  if (stdAddresses.length > 1) {
    next(new Error('account.errors.addresses.multipleStandard'));
  } else {
    if(stdAddresses.length == 0 && account.addresses.length == 1) {
      account.addresses[0].standard = true;
    }
    
    _.each(account.employeeRels, function(rel) {
      if(_.filter(account.employeeRels,{empid: rel.empid, type: rel.type}).length > 1) {
        next(new Error('account.errors.employee.relationship.multiple'));
        return;
      }      
    });
    
    next();
  }
});

module.exports = mongoose.model('Account', AccountSchema);