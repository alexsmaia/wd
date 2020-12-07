const models = require('../../models');

// Get Items List
exports.listAll = function(req, res) {
    return models.Topic.findAll({
        include: { model: models.Video }
    }).then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Gel All items wich Relations
exports.listAllRelations = function(req, res) {
    return models.Topic.findAll({
        include: { model: models.Video }
    }).then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItem = async function(req, res) {
    return models.Topic.findOne({
        where: { id: req.params.id }
    }).then(item => {
        res.status(200).json(item);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id with relations
exports.getItemRelations = function(req, res) {
    return models.Topic.findOne({
        where: { id: req.params.id },
        include: { model: models.Video }
    }).then(item => {
        res.status(200).json(item);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Add new Iten
exports.add = function(req, res) {
    return models.Topic.create({
        topic: req.body.topic,
        description: req.body.description,
        hexcolor: req.body.hexcolor,
    }).then(item => {
        res.status(200).json(`Topic ${item.topic} Created`);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Update Item
exports.update = function(req, res) {
    // Get Topic Update Data
    let updateTopic = {};
    updateTopic.topic = req.body.topic;
    updateTopic.description = req.body.description;
    updateTopic.hexcolor = req.body.hexcolor;
    // Update User
    return models.Topic.update(updateTopic, {
        where : {
            id : req.params.id
        }
    }).then(result => {
        if (result) {
            res.status(200).json("Topic Updated");
        } else {
            res.status(400).json("error");
        }
    }).catch(error => {
        res.status(400).json({message:error});
    })
}

// Update Item
exports.delete = function(req, res) {
    return models.Topic.findOne({
        where : { id : req.params.id },
        include: [{ model: models.Video }]
    }).then(item => {
        if (item.Videos.length == 0) {
            return item.destroy().then(result => {
                if (result) {
                    res.status(200).json("Topic Deleted");
                } else {
                    res.status(400).json("error");
                }
            }).catch(error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(409).json("Can't delete associated Topic");
        }
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Change Item Satus
exports.status = function(req, res) {
    return models.Topic.findOne({
        where: { id: req.params.id }
    }).then(item => {
        if (item.id > 0) {
            let itemStatus = {};
            if (item.status) {
                itemStatus.status = false;
            } else {
                itemStatus.status = true;
            }
            return models.Topic.update(itemStatus, {
                where : { id : item.id }
            }).then(result => {
                if (result) {
                    if (itemStatus.status) {
                        res.status(200).json(`Topic Published`);
                    } else {
                        res.status(200).json(`Topic Unpublished`);
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
