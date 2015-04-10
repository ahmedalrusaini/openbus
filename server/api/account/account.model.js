'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var i18n = require('i18n');
var Address = require('./address.model');
var _ = require('lodash');

var AccountSchema = new Schema({
  name: String,
  type: { type: String, default: 'organization' },
  addresses: [Address.schema]
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
  var stdAddresses = _.filter(this.addresses, {standard: true});
  if (stdAddresses.length > 1) {
    next(new Error('account.errors.addresses.multipleStandard'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Account', AccountSchema);