// Set Express App
const express = require('express');
const router = express.Router();
// Set Controller
const controller = require('../../controllers/wd/topics.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Model
const models = require('../../models');
// Set Middleware
let {isSupAdmin} = require('../../middleware/isSupAdmin.js');


// * * Set Routes * * //

// Get Items List
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

// Add new Iten
router.post('/', [
    body('topic').notEmpty().isLength({ max: 100 }).escape(),
    body('description').notEmpty().escape(),
    body('hexcolor').notEmpty().isHexColor().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.add(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Update Item
router.put('/:id', [
    param('id').notEmpty().escape(),
    body('topic').notEmpty().isLength({ max: 100 }).escape(),
    body('description').notEmpty().escape(),
    body('hexcolor').notEmpty().isHexColor().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.update(req, res); 
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

// Update Item Status
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