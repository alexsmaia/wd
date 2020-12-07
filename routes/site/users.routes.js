// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/site/users.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Model
const models = require('../../models');

// * * Set Routes * * //

// Update User
router.put('/:id', [
    param('id').notEmpty().escape(),
    body('username').notEmpty().escape().custom((value, { req }) => {
        return models.User.findOne({
            where: { username: value, }
        }).then(user => {
            if (user) {
                if (user.id != req.params.id) {
                    return Promise.reject('Username already in use');
                }
            }
        })
    }), 
    body('email').notEmpty().isEmail().escape().custom((value, { req }) => {
        return models.User.findOne({
            where: { email: value, }
        }).then(user => {
            if (user) {
                if (user.id != req.params.id) {
                    return Promise.reject('Email already in use');
                }
            }
        })
    }), 
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.update(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Change Password
router.put('/:id/password', [
    param('id').notEmpty().escape(),
    body('password').notEmpty().isLength({ min: 8 }).escape(),
    body('passwordConfirmation').notEmpty().escape().custom((value, { req }) => value == req.body.password),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.password(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// User Profile
router.get('/profile', function (req, res) {
    controller.profile(req, res);
});


// Export Routes
module.exports = router;