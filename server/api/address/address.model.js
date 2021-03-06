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
    var text = this.street || "";
    if (this.houseNo) text += " " + this.houseNo;
    if (this.postalCode) text += (text ? ", " : "") + this.postalCode;
    if (this.city) text += (text ? ", " : "") + this.city;
    if (this.country) text += (text ? ", " : "") + this.country;
    return text;
  });

module.exports = mongoose.model('Address', AddressSchema);
