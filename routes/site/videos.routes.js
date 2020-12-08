// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/site/videos.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')


// * * Set Routes * * //

// Active Items List
router.get('/', function (req, res) {
    controller.listAll(req, res);
});

// Active Items List with Topic info
router.get('/topics', function (req, res) {
    controller.listAllTopics(req, res);
});

// Get Item by Id
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

// Get Video details by Id with Relations
router.get('/:id/relations', [
    param('id').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getItemRelations(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Get List of Recent Items with Limit
router.get('/recent/:limit', [
    param('limit').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.recent(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})



// Export Routes
module.exports = router;