'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var ServiceRequestSchema = new Schema({
  description: String,
  startDate: Date,
  endDate: Date,
  notes: String,
  account: {
    id: Schema.Types.ObjectId
  },
  estimatedTime: Number,
  estimatedTimeUnit: String,
  createdAt: Date,
  updatedAt: Date
}, {
  toJSON: {
    virtuals: true
  }
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