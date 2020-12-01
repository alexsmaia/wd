const models = require('../../models');
const bcrypt = require('bcrypt');
const token = require('../../utilities/token');

// User Profile
exports.profile = function(req, res) { 
    token.getLogedUser(req.headers.authorization, (logedUser) => {
        if (logedUser.id > 0) {
            res.status(200).json(logedUser);
        } else {
            res.status(400).json("Error");
        }
    })
}

// Update User
exports.update = function(req, res) { 
    token.getLogedUser(req.headers.authorization, (logedUser) => {
        // Get User to Update
        return models.User.findOne({
            where: { id: req.params.id }
        }).then(userToUpdate => {
            if (logedUser.id == userToUpdate.id || logedUser.role_id > userToUpdate.role_id || logedUser.role_id == 3) {
                // Get User Update Data
                let updateUser = {};
                updateUser.username = req.body.username;
                updateUser.email = req.body.email;
                // Update User
                return models.User.update(updateUser, {
                    where : { id : req.params.id }
                }).then(result => {
                    if (result) {
                        res.status(200).json("User Updated");
                    } else {
                        res.status(400).json("Error");
                    }
                }).catch(error => {
                    res.send(400).json({message: error})
                });
            } else {
                res.status(401).send("Not Authorized");
            }
        }).catch(error => {
            res.send(400).json({message: error})
        });
    })
}

// Change User Password
exports.password = function(req, res) {
    token.getLogedUser(req.headers.authorization, (logedUser) => {
        if (logedUser.id == req.params.id || logedUser.role_id == 3) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    // Get User Update Data
                    let updateUser = {};
                    updateUser.password = hash;
                    // Update User
                    return models.User.update(updateUser, {
                        where : { id : req.params.id }
                    }).then(result => {
                        if (result) {
                            res.status(200).json("Password Changed");
                        } else {
                            res.status(400).json("error");
                        }
                    }).catch(error => {
                        res.status(400).json({message:error});
                    });
                });
            });
        } else {
            res.status(401).send("Not Authorized");
        }
    })
}
