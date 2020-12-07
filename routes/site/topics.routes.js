// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/site/topics.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')


// * * Set Routes * * //

// Active Topics List
router.get('/', function (req, res) {
    controller.listAll(req, res);
});

// Get Topic details by Id
router.get('/:id', [
    param('id').notEmpty().escape(),
], function (req, res) {
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

// Export Routes
module.exports = router;