// Set Express App
const express = require('express');
const router = express.Router();
// Set Controller
const controller = require('../../controllers/wd/comments.controller.js')
// Set Validator
const { validationResult, body, param } = require('express-validator')
// Set Model
const models = require('../../models');
// Set Middleware
let {isSupAdmin} = require('../../middleware/isSupAdmin.js');


// * * Set Routes * * //

// Get All Items
router.get('/', controller.listAll);

// Get All Items with relations
router.get('/relations', controller.listAllRelated);

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
        controller.getItemRelated(req, res); 
    } else {
        res.status(400).json({errors: errors.array()})
    }
})

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
    }), 
    body('userId').notEmpty().isNumeric().escape().custom(value => {
        return models.User.findOne({
            where: { id: value }
        }).then(item => {
            if (!item) {
                return Promise.reject('User Id not valid');
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

// Update Item
router.put('/:id', [
    param('id').notEmpty().escape(),
    body('comment').notEmpty().escape(),
    body('videoId').notEmpty().isNumeric().escape().custom(value => {
        return models.Video.findOne({
            where: { id: value }
        }).then(item => {
            if (!item) {
                return Promise.reject('Video Id not valid');
            }
        })
    }), 
    body('userId').notEmpty().isNumeric().escape().custom(value => {
        return models.User.findOne({
            where: { id: value }
        }).then(item => {
            if (!item) {
                return Promise.reject('User Id not valid');
            }
        })
    }),
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