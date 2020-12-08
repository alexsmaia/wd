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

// Get Item List
router.get('/', controller.listAll);

// Get Items List with relations
router.get('/relations', controller.listAllRelations);

// Get Item by Id
router.get('/:id', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getItem(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Get Item by Id with relations
router.get('/:id/relations', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getItemRelations(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Delete Item
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

// Change Status
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