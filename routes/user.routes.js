// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const userController = require('../controllers/user.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Model
const models = require('../models');
// Set Middleware
let {isSupAdmin} = require('../middleware/isSupAdmin.js');

// Set Routes
router.get('/', userController.users);
router.get('/:id', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        userController.user(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
router.put('/:id', [
    param('id').notEmpty().escape(),
    body('username').notEmpty().escape().custom((value, { req }) => {
        return models.User.findOne({
            where: {
                username: value,
            }
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
            where: {
                email: value,
            }
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
        userController.update(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
router.delete('/:id', [
    param('id').notEmpty().escape(), 
], isSupAdmin, function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        userController.delete(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
router.put('/:id/password', [
    body('password').notEmpty().isLength({ min: 8 }).escape(),
    body('passwordConfirmation').notEmpty().escape().custom((value, { req }) => value == req.body.password),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        userController.password(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
router.put('/:id/role', [
    param('id').notEmpty().escape(),
    body('role_id').notEmpty().isNumeric().escape(),
], isSupAdmin, function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        userController.changeRole(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
router.put('/:id/status', userController.status);

// Export Routes
module.exports = router;