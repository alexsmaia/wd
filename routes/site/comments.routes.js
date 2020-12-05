// Set Express App
const express = require('express');
let router = express.Router();
// Set Controller
const controller = require('../../controllers/site/comments.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Models
const models = require('../../models');


// * * Set Routes * * //

// User Comments List
router.get('/', function (req, res) {
    controller.listAll(req, res);
});

// Add Item
router.post('/', [
    body('comment').notEmpty().escape(),
    body('videoId').notEmpty().isNumeric().escape().custom(value => {
        return models.Video.findOne({
            where: { id: value }
        }).then(item => {
            if (!item) {
                return Promise.reject('Video Id not valid');
            }
        })
    })
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.add(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

// Archive Comment
router.put('/:id', [
    param('id').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.archive(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})


// Export Routes
module.exports = router;