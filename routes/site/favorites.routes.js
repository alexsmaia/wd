// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/site/favorites.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')


// * * Set Routes * * //

// User Favorites List
router.get('/', function (req, res) {
    controller.listAllActive(req, res);
});

// User add / remove Favorite
router.get('/:videoId', [
    param('videoId').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.addRemove(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})


// Export Routes
module.exports = router;