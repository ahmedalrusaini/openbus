'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var i18n = require('i18n');

var AddressSchema = new Schema({
  standard: Boolean,
  street: String,
  houseNo: String,
  postalCode: String,
  city: String, 
  country: String,
  telephone: String,
  mobilePhone: String,
  email: { type: String, lowercase: true }
}, {
  toJSON: { virtuals: true }
});

AddressSchema
  .virtual('text')
  .get(function () {
    var address = this.street;
    if (address && this.house_no) address += " " + this.house_no;
    if (address && this.postal_code) address += ", " + this.postal_code;
    if (address && this.city) address += ", " + this.city;
    if (address && this.country) address += ", " + this.country;    
    return address;
  });

module.exports = mongoose.model('Address', AddressSchema);
