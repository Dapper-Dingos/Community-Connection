'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');

// ******************************* //
// used for file upload profileView
// ******************************* //
var path = './server/api/user/assets/profile-pictures'
var multipartMiddleware = multipart({ uploadDir: path });

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id/showall', controller.showAll);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/updateprofileinfo', controller.updateProfileInfo);
// router.put('/:id/updateprofileskills', controller.updateProfileSkills);
router.post('/profilepic', multipartMiddleware, controller.profilepic);
router.get('/assets/profile-pictures/:fn', controller.getProfilePic)
router.post('/:id/getfriends', controller.getfriends);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
