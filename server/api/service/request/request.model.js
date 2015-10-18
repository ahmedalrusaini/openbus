'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var i18n = require('i18n');

var ServiceRequestSchema = new Schema({
  description: String,
  startDate: Date,
  endDate: Date,
  notes: String,
  account: {
    id: Schema.Types.ObjectId
  },
  employee: {
    id: Schema.Types.ObjectId
  },
  estimatedTime: Number,
  estimatedTimeUnit: String,
  createdAt: Date,
  updatedAt: Date,
  status: { type: String, default: 'open' }
}, {
  toJSON: {
    virtuals: true
  }
});

ServiceRequestSchema
  .virtual('statusname')
  .get(function () {
    return i18n.__("status." + this.status);
  });

ServiceRequestSchema.pre('save', function(next) {
  if(this.isNew) {
    this.createdAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  
  next();
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);