const models = require('../../models');


// Get Items List
exports.listAll = function(req, res) {
    res.status(400).json("logedId");

    return models.Comment.findAll().then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Gel All items wich Relations
exports.listAllRelations = function(req, res) {
    return models.Comment.findAll({
        include: [
            { model: models.Video },
            { model: models.User }
        ]
    }).then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItem = function(req, res) {
    return models.Comment.findOne({
        where: {id: req.params.id},
    }).then(item => {
        res.status(200).json(item);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id with relations
exports.getItemRelations = function(req, res) {
    return models.Comment.findOne({
        where: { id: req.params.id },
        include: [
            { model: models.Video },
            { model: models.User }
        ]
    }).then(item => {
        res.status(200).json(item);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Add new Iten
exports.add = function(req, res) {
    return models.Comment.create({
        userId: req.body.userId,
        videoId: req.body.videoId,
        comment: req.body.comment,
        status: true,
    })
    .then(result => {
        if (result) {
            res.status(200).json(`Comment Created`);
        } else {
            res.status(400).json("error");
        }
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Update Item
exports.update = function(req, res) {
    // Get Item Update Data
    let updateData = {};
    updateData.userId = req.body.userId;
    updateData.videoId = req.body.videoId;
    updateData.comment = req.body.comment;
    // Update Item
    return models.Comment.update(updateData, {
        where : { id : req.params.id }
    }).then(result => {
        if (result) {
            res.status(200).json("Comment Updated");
        } else {
            res.status(400).json("error");
        }
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Delete Item
exports.delete = function(req, res) {
    return models.Comment.destroy({
        where : { id : req.params.id }
    }).then(result => {
        if (result) {
            res.status(200).json("Comment Deleted");
        } else {
            res.status(400).json("error");
        }
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Change Item Satus
exports.status = function(req, res) {
    return models.Comment.findOne({
        where: { id: req.params.id }
    }).then(item => {
        if (item.id > 0) {
            let itemStatus = {};
            if (item.status) {
                itemStatus.status = false;
            } else {
                itemStatus.status = true;
            }
            return models.Comment.update(itemStatus, {
                where : { id : item.id }
            }).then(result => {
                if (result) {
                    if (itemStatus.status) {
                        res.status(200).json(`Comment Published`);
                    } else {
                        res.status(200).json(`Comment Unpublished`);
                    }
                } else {
                    res.status(400).json("Error");
                }
            }).catch(error => {
                res.status(400).json({message:error});
            });
        }
    }).catch(error => {
        res.status(400).json({message:error});
    })
}