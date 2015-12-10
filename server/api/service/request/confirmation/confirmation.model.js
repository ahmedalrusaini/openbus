'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var i18n = require('i18n');

var ServiceRequestConfirmationSchema = new Schema({
  startDate: Date,
  endDate: Date,
  notes: String,
  employee: { id: Schema.Types.ObjectId },
  request: { id: Schema.Types.ObjectId },
  timeSpent: Number,
  timeSpentUnit: String,
  createdAt: Date,
  updatedAt: Date,
  status: { type: String, default: 'open' }
}, {
  toJSON: {
    virtuals: true
  }
});

ServiceRequestConfirmationSchema
  .virtual('statusname')
  .get(function () {
    return i18n.__("status." + this.status);
  });

ServiceRequestConfirmationSchema.pre('save', function(next) {
  if(this.isNew) {
    this.createdAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  
  next();
});

module.exports = mongoose.model('ServiceRequestConfirmation', ServiceRequestConfirmationSchema);