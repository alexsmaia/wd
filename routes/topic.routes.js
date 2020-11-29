// Set Express App
const express = require('express');
const router = express.Router();
// Set Controller
const topicController = require('../controllers/topic.controller.js')
// Set Validator
const { validationResult, body } = require('express-validator')
// Set Model
const models = require('../models');

// Set Routes



// Export Routes
module.exports = router;