const models = require('../../models');

// Get Items List
exports.listAll = function(req, res) {
    return models.Favorite.findAll().then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Gel All items wich Relations
exports.listAllRelated = function(req, res) {
    return models.Favorite.findAll({
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
    return models.Favorite.findOne({
        where: {id: req.params.id},
    }).then(item => {
        res.status(200).json(item);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id with relations
exports.getItemRelated = function(req, res) {
    return models.Favorite.findOne({
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
    return models.Favorite.create({
        userId: req.body.userId,
        videoId: req.body.videoId,
    })
    .then(result => {
        if (result) {
            res.status(200).json(`Favorite Created`);
        } else {
            res.status(400).json("error");
        }
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Update Item
exports.update = function(req, res) {
    // Get Topic Update Data
    let updateData = {};
    updateData.userId = req.body.userId;
    updateData.videoId = req.body.videoId;
    // Update User
    return models.Favorite.update(updateData, {
        where : { id : req.params.id }
    }).then(result => {
        if (result) {
            res.status(200).json("Favorite Updated");
        } else {
            res.status(400).json("error");
        }
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Delete Item
exports.delete = function(req, res) {
    return models.Favorite.destroy({
        where : { id : req.params.id }
    }).then(result => {
        if (result) {
            res.status(200).json("Favorite Deleted");
        } else {
            res.status(400).json("error");
        }
    }).catch (error => {
        res.status(400).json({message:error});
    });
}
