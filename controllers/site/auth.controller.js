const models = require('../../models');
const bcrypt = require('bcrypt');
const token = require('../../utilities/token');

// User Login
exports.login = function(req, res) {
    return models.User.findOne({
        where: { username: req.body.username }
    }).then(user => {
        // Check User Status
        if (user.status) {
            // Compare passwords
            bcrypt.compare(req.body.password, user.password).then(function(result) {
                if(result) {
                    token.generateToken({user_id: user.id, username: user.username, role: user.role_id}, (token) => {
                        res.status(200).json(token); 
                    })
                } else {
                    res.status(401).json("Not Authorized"); 
                }
            });
        } else {
            res.status(401).json("Not Authorized");
        }
    }).catch(error => {
        res.status(400).json({message: error})
    })
}

// New User
exports.register = function(req, res) {
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
