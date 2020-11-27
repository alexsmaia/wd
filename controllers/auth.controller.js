const models = require('../models');
const bcrypt = require('bcrypt');
const token = require('../utilities/token')

// User Login
exports.login = async function(req, res) {
    const user = await models.User.findOne({
        where: {
            username: req.body.username,
        }
    })
    if (user) {
        bcrypt.compare(req.body.password, user.password).then(function(result) {
            if(result) {
                token.generateToken({user: user.username}, (token) => {
                    res.status(200).json(token); 
                })
            } else {
                res.status(401).send("Not Authorized"); 
            }
        });
    } else {
        res.status(401).send("Not Authorized");
    }
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