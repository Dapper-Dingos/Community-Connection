'use strict';

var User = require('./user.model');
var path = require('path')
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/*** Get list of users; restriction: 'admin'*/
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/*** Creates a new user*/
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/*** Get a single user*/
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/*** Get all users*/
exports.showAll = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    if (!users) return res.send(401);
    res.json(200, users);
  });
};

/*** Deletes a user; restriction: 'admin'*/
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/*** Change a users password*/
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

//******************  //
// update user info
//******************** //
exports.updateProfileInfo = function(req, res, next) {
  console.log('user.controller.updateProfileInfo: req.user', req.body)
  var userId = req.body.user._id;
  var newProfileInfo = req.body.newProfileInfo;
  console.log('user.controller.updateProfileInfo', typeof newProfileInfo, newProfileInfo)
  User.findById(userId, function (err, user) {
    if(user) {
      user.profileInfo = newProfileInfo;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

//******************  //
// update user info "profileInfo":{"profilePicUrl":
//******************** //

exports.profilepic = function(req, res, next) {
  console.log('user.controller.profilepic: req.body', req.body)
  var userId = req.body.userId;
  var picPath = req.files.file.path.replace('server/api/user','api/users');
  User.findById(userId, function (err, user) {
    if (err){console.log(err)}
    console.log(user)
    if(user) {
      user.profileInfo.profilePicUrl = req.files.file.path.replace('server/api/user','api/users'); // THIS IS GROSS
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};


// ****************************** //
// getProfilPic
// ****************************** //

exports.getProfilePic = function(req, res, next){
  console.log(req.body)
  console.log(req.params)
  console.log('Profile Picture')
  var options = {
    root: __dirname + '/assets/profile-pictures/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendfile(req.params.fn, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
    }
  });
}

exports.getfriends = function(req, res, next) {
 console.log('user.controller.getfriends: req.body req.params', req.body, req.params)
 User.find({ _id: { $in: req.body.friends}}, function(err, friends) {
   if(err){
     res.send(403);
    }
    else {
      return res.status(200).json(friends)
    }
 })
}
/*** Get my info*/
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    console.log(user)
    res.json(user);
  });
};

/*** Authentication callback*/
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
