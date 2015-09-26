'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
  byUserId: String,
  name: String,
  username: String,
  category: String,
  info: String,
  location: String,
  longitude : Number,
  latitude : Number,
  description: String,
  price: Number,
  active: Boolean,
  picture: String,
  friends: []
});

module.exports = mongoose.model('Job', JobSchema);