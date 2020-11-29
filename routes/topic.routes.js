// Set Express App
const express = require('express');
const router = express.Router();
// Set Controller
const topicController = require('../controllers/topic.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Model
const models = require('../models');
// Set Middleware
let {isSupAdmin} = require('../middleware/isSupAdmin.js');

// Set Routes
router.get('/', topicController.topics);

router.post('/', [
    body('topic').notEmpty().isLength({ max: 100 }).escape(),
    body('description').notEmpty().escape(),
    body('hexcolor').notEmpty().isHexColor().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        topicController.add(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

router.get('/:id', [
    param('id').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        topicController.topic(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

router.put('/:id', [
    param('id').notEmpty().escape(),
    body('topic').notEmpty().isLength({ max: 100 }).escape(),
    body('description').notEmpty().escape(),
    body('hexcolor').notEmpty().isHexColor().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        topicController.update(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

router.delete('/:id', [
    param('id').notEmpty().escape(),
], isSupAdmin, function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        topicController.delete(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

router.put('/:id/status', topicController.status);


// Export Routes
module.exports = router;