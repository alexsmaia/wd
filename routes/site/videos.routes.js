// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/site/videos.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')


// * * Set Routes * * //

// Get Video details by Id
router.get('/:id', [
    param('id').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.video(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})


// Export Routes
module.exports = router;