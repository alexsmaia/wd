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
// User Login
router.post('/login', [
    body('username').notEmpty().escape(),
    body('password').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authController.login(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
// New User
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
    body('password').notEmpty().isLength({ min: 8 }).escape(),
    body('passwordConfirmation').notEmpty().escape().custom((value, { req }) => value == req.body.password)
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authController.register(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Export Routes
module.exports = router;