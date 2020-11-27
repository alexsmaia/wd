// Set Express App
const express = require('express');
const router = express.Router();
// Set Controller
const authController = require('../controllers/auth.controller.js')
// Set Validator
const { validationResult, body } = require('express-validator')
// Set Model
const models = require('../models');

// Set Routes
router.post('/login',  function (req, res) {
    authController.login(req, res); 
})
router.post('/register', [
    body('username').notEmpty().escape().custom(value => {
        return models.User.findOne({
            where: {
                username: value,
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Username already in use');
            }
        })
    }), 
    body('email').notEmpty().isEmail().escape().custom(value => {
        return models.User.findOne({
            where: {
                email: value,
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Email already in use');
            }
        })
    }), 
    body('password').notEmpty().isLength({ min: 8 }).escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authController.register(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

// Export Routes
module.exports = router;