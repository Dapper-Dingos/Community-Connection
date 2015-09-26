'use strict';

var express = require('express');
var controller = require('./job.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/getmyjobs', controller.getmyjobs)
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/createjob', controller.createJob);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;