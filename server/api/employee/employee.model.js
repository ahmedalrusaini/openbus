'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var i18n = require('i18n');
var _ = require('lodash');

var EmployeeSchema = new Schema({
  firstname: String,
  lastname: String,
  address: {
    street: String,
    houseNo: String,
    postalCode: String,
    city: String, 
    country: String,
    telephone: String,
    mobilePhone: String,
    email: { type: String, lowercase: true }
  }
}, {
  toJSON: { virtuals: true }
});

EmployeeSchema
  .virtual('address.text')
  .get(function () {
    var text = this.address.street || "";
    if (this.address.houseNo) text += " " + this.address.houseNo;
    if (this.address.postalCode) text += (text ? ", " : "") + this.address.postalCode;
    if (this.address.city) text += (text ? ", " : "") + this.address.city;
    if (this.address.country) text += (text ? ", " : "") + this.address.country;
    return text;
  });


module.exports = mongoose.model('Employee', EmployeeSchema);