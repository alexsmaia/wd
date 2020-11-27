// Set Express App
const express = require('express');
let router = express.Router();

// Set Controller
const UserController = require('../controllers/user.controller.js')

// Set Routes
router.get('/login', (req, res) => {
    res.send('Login');
});
router.get('/register', (req, res) => {
    res.send('Register');
});

// Export Routes
module.exports = router;