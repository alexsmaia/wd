const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Get List of Users
exports.users = async function(req, res, next) {
    try {
        const users = await models.User.findAll({
            attributes: ['id', 'username', 'email', 'status', 'role_id']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message:error});
    }
}

// Get User by id
exports.user = async function(req, res, next) {
    try {
        const user = await models.User.findOne({
            where: { id: req.params.id }
        });
        if (user.id > 0) {
            res.status(200).json(user);
        } else {
            res.status(400).send("Error"); 
        }
    } catch (error) {
        res.status(400).json({message:error});
    }
}

// Update User
exports.update = function(req, res, next) {
    // Get User Update Data
    let updateUser = {};
    updateUser.username = req.body.username;
    updateUser.email = req.body.email;
    // Update User
    return models.User.update(updateUser, {
        where : {
            id : req.params.id
        }
    }).then(user => {
        if (user.id > 0) {
            res.status(200).json("User Updated");
        } else {
            res.status(400).json("Error");
        }
    }).catch(error => {
        res.status(400).json({message:error});
    })
}

// Delete User
exports.delete = function(req, res, next) {
    // get the decoded payload ignoring signature
    let authorization = req.headers.authorization;
    let decoded = jwt.decode(authorization.replace('Bearer ', ''));
    // Find login user
    return models.User.findOne({
        where : {
            username : decoded.data.username
        }
    }).then(user => {
        if (user.id > 0) {
            // Check if user try delete himself
            if (user.id == req.params.id) {
                res.status(409).json("Can't delete yourself");
            } else {
                // Delete User
                return models.User.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(result => {
                    res.status(200).json("User Deleted");
                }).catch(error => {
                    res.status(400).json({message:error});
                });
            }
        } else {
            res.status(400).json("Error");
        }
    }).catch(error => {
        res.status(400).json({message:error});
    })
}

// Change User Satus
exports.status = async function(req, res, next) {
    try {
        // Get User
        const user = await models.User.findOne({
            where: { id: req.params.id }
        });
        if (user.id > 0) {
            let userStatus = {};
            if (user.status) {
                userStatus.status = false;
            } else {
                userStatus.status = true;
            }
            return models.User.update(userStatus, {
                where : {
                    id : user.id
                }
            }).then(userUp => {
                if (userUp.id > 0) {
                    if (user.status) {
                        res.status(200).json("User Status Active");
                    } else {
                        res.status(200).json("User Status Inactive");
                    }
                } else {
                    res.status(200).json("User Deleted");
                }
            }).catch(error => {
                res.status(400).json({message:error});
            })
        } else {
            res.status(400).send("Error"); 
        }
    } catch (error) {
        res.status(400).json({message:error});
    }
}

// Change User Password
exports.password = function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Get User Update Data
            let updateUser = {};
            updateUser.password = hash;
            // Update User
            return models.User.update(updateUser, {
                where : {
                    id : req.params.id
                }
            }).then(result => {
                res.status(200).json("Password Changed");
            }).catch(error => {
                res.status(400).json({message:error});
            })
            
        });
    });
}

// Change User Role
exports.changeRole = async function(req, res, next) {
    // get the decoded payload ignoring signature
    let authorization = req.headers.authorization;
    let decoded = jwt.decode(authorization.replace('Bearer ', ''));
    // Find login user
    return models.User.findOne({
        where : {
            username : decoded.data.username
        }
    }).then(user => {
        if (user.id > 0) {
            // Check if user try delete himself
            if (user.id == req.params.id) {
                res.status(409).json("Can't delete yourself");
            } else {
                // Get User Update Data
                let updateUser = {};
                updateUser.role_id = req.body.role_id;
                // Update User
                return models.User.update(updateUser, {
                    where : {
                        id : req.params.id
                    }
                }).then(result => {
                    res.status(200).json("User Role Changed");
                }).catch(error => {
                    res.status(400).json({message:error});
                })
            }
        } else {
            res.status(400).json("Error"); 
        }
    }).catch(error => {
        res.status(400).json({message:error});
    })
    
}