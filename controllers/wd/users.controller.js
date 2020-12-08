const models = require('../../models');
const token = require('../../utilities/token');

// Get List of Users
exports.listAll = function(req, res) {
    return models.User.findAll({
        include: { model: models.Video }
    }).then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Gel All items wich Relations
exports.listAllRelations = function(req, res) {
    return models.User.findAll({
        include: [
            { model: models.Comment },
            { model: models.Favorite,
                include: {model: models.Video}
            }
        ]
    }).then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItem = function(req, res) {
    return models.User.findOne({
        where: {id: req.params.id},
    }).then(item => {
        res.status(200).json(item);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItemRelations = async function(req, res) {
    return models.User.findOne({
        where: { id: req.params.id },
        include: [
            { model: models.Comment },
            { model: models.Favorite,
                include: {model: models.Video}
            }
        ]
    }).then(item => {
        res.status(200).json(item);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Delete Item
exports.delete = function(req, res) {
    token.getLogedId(req.headers.authorization, (logedUserId) => {
        // Check if user try delete himself
        if (logedUserId == req.params.id) {
            res.status(409).json("Can't delete yourself");
        } else {
            // Check if item have related items
            return models.User.findOne({
                where : { id : req.params.id },
                include: [
                    { model: models.Comment },
                    { model: models.Favorite}
                ]
            }).then(item => {
                if (item.Comments.length > 0 || item.Favorites.length > 0) {
                    res.status(409).json("Can't delete record with associated item!!");
                } else {
                    // Delete Item
                    return item.destroy()
                    .then(result => {
                        if(result) {
                            res.status(200).json("User Deleted");
                        } else {
                            res.status(400).json("error");
                        }
                    }).catch(error => {
                        res.status(400).json({message:error});
                    });
                }
            }).catch(error => {
                res.status(400).json({message:error});
            });
        }
    })
}

// Change User Satus
exports.status = function(req, res) {
    token.getLogedUser(req.headers.authorization, (logedUser) => {
        // Check if same user
        if (logedUser.id != req.params.id) {
            // Get User
            return models.User.findOne({
                where: { id: req.params.id }
            }).then(user => {
                // Check if User is Super Admin
                if (user.role_id < 3 || logedUser.role_id == 3) {
                    let userStatus = {};
                    if (user.status) {
                        userStatus.status = false;
                    } else {
                        userStatus.status = true;
                    }
                    return models.User.update(userStatus, {
                        where : { id : user.id }
                    }).then(result => {
                        if (result) {
                            if (userStatus.status) {
                                res.status(200).json(`User ${user.username} Active`);
                            } else {
                                res.status(200).json(`User ${user.username} Inactive`);
                            }
                        } else {
                            res.status(400).json("error");
                        }
                    }).catch(error => {
                        res.status(400).json({message:error});
                    });
                } else {
                    res.status(401).json("Not Authorized");
                }
            }).catch(error => {
                res.status(400).json({message:error});
            }).catch(error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(409).json("Can't change your own Status");
        }
    })
}

// Change User Role
exports.changeRole = async function(req, res) {
    token.getLogedId(req.headers.authorization, (logedUserId) => {
        if (logedUserId == req.params.id) {
            res.status(409).json("Can't change your own Role");
        } else {
            // Get User Update Data
            let updateUser = {};
            updateUser.role_id = req.body.role_id;
            // Update User
            return models.User.update(updateUser, {
                where : { id : req.params.id }
            }).then(result => {
                if (result) {
                    res.status(200).json("User Role changed");
                } else {
                    res.status(400).json("error");
                }
            }).catch(error => {
                res.status(400).json({message:error});
            });
        }
    })
}
