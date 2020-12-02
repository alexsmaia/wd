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
    controller.topics(req, res);
});

// Get Topic details by Id
router.get('/:id', [
    param('id').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.topic(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})


// Export Routes
module.exports = router;