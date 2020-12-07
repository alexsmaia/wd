const models = require('../../models');

// Get Items List
exports.listAll = function(req, res) {
    return models.Video.findAll()
    .then(items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Gel All items wich Relations
exports.listAllRelations = function(req, res) {
    return models.Video.findAll({
        include: [
            { model: models.Topic },
            { model: models.Comment },
            { model: models.Favorite,
                include: {model: models.User}
            }
        ]
    }).then (items => {
        res.status(200).json(items);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItem = async function(req, res) {
    return models.Video.findOne({
        where: { id: req.params.id }
    }).then(video => {
        res.status(200).json(video);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItemRelations = async function(req, res) {
    return models.Video.findOne({
        where: { id: req.params.id },
        include: [
            { model: models.Topic },
            { model: models.Comment },
            { model: models.Favorite,
                include: {model: models.User}
            }
        ]
    }).then(video => {
        res.status(200).json(video);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Add Item
exports.add = function(req, res) {
    // Get Topic Id's
    let topicIds = req.body.topics;
    // Get new Video data
    let newItem = {};
    newItem.title = req.body.title;
    newItem.youtubeid = req.body.youtubeid;
    return models.Video.create(newItem).then(video => {
        topicIds.forEach(topicId => {
            video.addTopics(topicId.id);
        });
        res.status(200).json(`Video ${video.title} adicionado`);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Update Item
exports.update = function(req, res) {
    // ToDo - Check diference topics ids
    // Get Topic Id's
    let topicIds = req.body.topics;
    // Get new Video data
    let upItem = {};
    upItem.title = req.body.title;
    upItem.youtubeid = req.body.youtubeid;
    return models.Video.findOne({
        where: { id: req.params.id }
    }).then(video => {
        return models.Video.update(upItem, {
            where : { id : req.params.id }
        }).then(result => {
            if (result) {
                return models.Topic.findAll().then(topics => {
                    topics.forEach(topic => {
                        topicIds.forEach(topicId => {
                            if (topic.id == topicId.id) {
                                video.addTopics(topic);
                            } else {
                                video.removeTopics(topic);
                            }
                        });
                    });
                    res.status(200).json(`Video ${upItem.title} atualizado`);
                }).catch(error => {
                    res.status(400).json({message:error});
                });
            } else {
                res.status(400).json("Error"); 
            }
        }).catch(error => {
            res.status(400).json({message:error});
        });
         
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Delete Item
exports.delete = function(req, res) {
    return models.Video.destroy({
        where : { id : req.params.id }
    }).then(result => {
        if (result) {
            res.status(200).json("Video Deleted");
        } else {
            res.status(400).json("error");
        }
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Change Item Satus
exports.status = async function(req, res) {
    try {
        // Get Topic
        const item = await models.Video.findOne({
            where: { id: req.params.id }
        });
        if (item.id > 0) {
            let itemStatus = {};
            if (item.status) {
                itemStatus.status = false;
            } else {
                itemStatus.status = true;
            }
            return models.Video.update(itemStatus, {
                where : {
                    id : item.id
                }
            }).then(result => {
                if (result) {
                    if (itemStatus.status) {
                        res.status(200).json(`Video ${item.title} Active`);
                    } else {
                        res.status(200).json(`Video ${item.title} Inactive`);
                    }
                } else {
                    res.status(400).json("Error");
                }
            }).catch(error => {
                res.status(400).json({message:error});
            })
        } else {
            res.status(400).json("Error"); 
        }
    } catch (error) {
        res.status(400).json({message:error});
    }
}