const models = require('../../models');

// Get List of Topics
exports.topics = function(req, res) {
    return models.Topic.findAll({
        include: { model: models.Video }
    }).then (topics => {
        res.status(200).json(topics);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Get Topic by Id
exports.topic = async function(req, res) {
    return models.Topic.findOne({
        where: { id: req.params.id },
        include: { model: models.Video }
    }).then(topic => {
        res.status(200).json(topic);
    }).catch (error => {
        res.status(400).json({message:error});
    });
}

// Add new Topic
exports.add = function(req, res) {
    return models.Topic.create({
        topic: req.body.topic,
        description: req.body.description,
        hexcolor: req.body.hexcolor,
    }).then(topic => {
        res.status(200).json(`Topic ${topic.topic} Created`);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Update Topic
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

// Delete Topic
exports.delete = function(req, res) {
    return models.Topic.findOne({
        where : { id : req.params.id },
        include: [{ model: models.Video }]
    }).then(topic => {
        if (topic.Videos.length == 0) {
            return topic.destroy().then(result => {
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

// Change Topic Satus
exports.status = async function(req, res) {
    try {
        // Get Topic
        const item = await models.Topic.findOne({
            where: { id: req.params.id }
        });
        if (item.id > 0) {
            let itemStatus = {};
            if (item.status) {
                itemStatus.status = false;
            } else {
                itemStatus.status = true;
            }
            return models.Topic.update(itemStatus, {
                where : {
                    id : item.id
                }
            }).then(result => {
                if (result) {
                    if (itemStatus.status) {
                        res.status(200).json(`Topic ${item.topic} Active`);
                    } else {
                        res.status(200).json(`Topic ${item.topic} Inactive`);
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