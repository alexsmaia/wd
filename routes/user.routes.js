// Set Express App
const express = require('express');
let router = express.Router();

// Set Controller
const UserController = require('../controllers/user.controller.js')


router.get('/', (req, res) => {
    res.send('We are home');
});

// Set User Routes
router.get('/users', UserController.users);


module.exports = router;