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

// Get Topics List
router.get('/', controller.topics);

// Add Topic
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

// Get Topic by Id
router.get('/:id', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.topic(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Update Topic
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

// Delete Topic
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

// Update Topic Status
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