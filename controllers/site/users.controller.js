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

// User Profile Comments
exports.profileComments = function(req, res) { 
    token.getLogedId(req.headers.authorization, (logedId) => {
        return models.User.findOne({
            where: [ { id: logedId } ],
            include: { 
                model: models.Comment,
                where: { archived: 0},
                attributes: ['id', 'comment', 'status'],
            }
        }).then(item => {
            res.status(200).json(item);
        }).catch(error => {
            res.status(400).json({message:error});
        });
    })
}

// User Profile Favorites
exports.profileFavorites = function(req, res) { 
    token.getLogedId(req.headers.authorization, (logedId) => {
        return models.User.findOne({
            where: [ { id: logedId } ],
            include: { 
                model: models.Favorite,
                include: {
                    model: models.Video,
                    where: { status: 1},
                    attributes: ['id', 'title', 'youtubeid']
                }
            }
        }).then(item => {
            res.status(200).json(item);
        }).catch(error => {
            res.status(400).json({message:error});
        });
    })
}

// Update Item
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
                    res.status(400).json({message: error})
                });
            } else {
                res.status(401).json("Not Authorized");
            }
        }).catch(error => {
            res.status(400).json({message: error})
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
            res.status(401).json("Not Authorized");
        }
    })
}
