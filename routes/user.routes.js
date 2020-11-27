// Set Express App
const express = require('express');
let router = express.Router();

// Set Controller
const UserController = require('../controllers/user.controller.js')

// Set Routes
router.get('/', UserController.users);

// Export Routes
module.exports = router;