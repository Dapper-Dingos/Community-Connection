/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /messages              ->  index
 * POST    /messages              ->  create
 * GET     /messages/:id          ->  show
 * PUT     /messages/:id          ->  update
 * DELETE  /messages/:id          ->  destroy
 */
'use strict';

var _ = require('lodash');
var Message = require('./message.model');

// Get list of messages
exports.index = function(req, res) {
  Message.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, messages);
  });
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    return res.json(201, message);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.lastMessage = function(req, res) {
  console.log("lastMessage-controller", req.body);

        Message.aggregate({ "$match": {"toUserId": req.body.currentUserId,
                                  "fromUserId": {"$in": req.body.friends}}
                    },
                    {"$sort": { "date": -1 }
                    }, 
                    {"$group": {
                        "_id": "$fromUserId",
                        "body": {
                            "$first": "$body" 
                        },
                      "date": {
                        "$first": "$date" 
                        },
                       "fromUserName": { 
                          "$first": "$fromUserName"
                      },
                      "fromUserPicUrl": {
                        "$first": "$fromUserPicUrl"
                      },

                    },
                  },

                    function(err, message){
                      console.log("mcl", message);
                      console.log("mcl", err);
                      return res.json(201, message)
                    }
       // Result is an array of documents

);
//   Message.aggregate({ "$match": {"toUserId": req.body.currentUserId,
//                                   "fromUserId": {"$in": req.body.friends}}
//                     }, 
//                     {"$sort": { "date": -1 }
//                     }, function(err, message){
//                       console.log("mcl", message);
//                       console.log("mcl", err);
//                       return res.json(201, message)
//                     }
//        // Result is an array of documents

// );


  }


exports.sendmessage = function(req, res) {

  console.log("Message-Controller",req.body.message)
  Message.create(req.body.message, function(err, message) {
    console.log('Message.create', err, message)
    if(err) { return handleError(res, err); }
    return res.json(201, message);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}