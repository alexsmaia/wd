// Set Express App
const express = require('express');
let router = express.Router();

// Set Controller
const userController = require('../controllers/user.controller.js')

// Set Routes
router.get('/', userController.users);

// Export Routes
module.exports = router;