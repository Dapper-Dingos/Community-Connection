
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title:  String,
  fromUserId: String,//Schema.Types.ObjectId,
  fromUserName: String,
  toUserId: String,//Schema.Types.ObjectId,
  toUserName: String,
  body:   String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  fromUserPicUrl: String
});

module.exports = mongoose.model('Message', MessageSchema);
