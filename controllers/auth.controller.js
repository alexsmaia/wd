const models = require('../models');
const bcrypt = require('bcrypt');

// User Login
exports.login = async function(req, res, next) {
    res.send('Login');
}
// New User
exports.register = function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            return models.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            }).then(user => {
                res.status(200).json("User Created");
            })
        });
    });
}