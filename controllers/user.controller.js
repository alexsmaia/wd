const models = require('../models');

exports.users = function(req, res, next) {
    return models.User.findAll().then(users => {
        res.json(users);
    });
}