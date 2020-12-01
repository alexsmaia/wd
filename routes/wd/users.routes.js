// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/wd/users.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Model
const models = require('../../models');
// Set Middleware
let {isSupAdmin} = require('../../middleware/isSupAdmin.js');

// * * Set Routes * * //
// Get Users List
router.get('/', controller.users);
// Get User Info by Id
router.get('/:id', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.user(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
// Delete User
router.delete('/:id', [
    param('id').notEmpty().escape(), 
], isSupAdmin, function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.delete(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
// Change User Role
router.put('/:id/role', [
    param('id').notEmpty().escape(),
    body('role_id').notEmpty().isNumeric().escape(),
], isSupAdmin, function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.changeRole(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})
// Update User Status
router.put('/:id/status', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.status(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
});

// Export Routes
module.exports = router;