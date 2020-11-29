const models = require('../models');

// Get List of Topics
exports.topics = async function(req, res, next) {
    try {
        const users = await models.Topic.findAll({
            attributes: ['id', 'topic', 'description', 'status']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message:error});
    }
}
// Get Topic by Id
exports.topic = async function(req, res, next) {
    try {
        const topic = await models.Topic.findOne({
            where: { id: req.params.id }
        });
        if (topic.id > 0) {
            res.status(200).json(topic);
        } else {
            res.status(400).send("Error"); 
        }
    } catch (error) {
        res.status(400).json({message:error});
    }
}

// Add new Topic
exports.add = function(req, res, next) {
    return models.Topic.create({
        topic: req.body.topic,
        description: req.body.description,
        hexcolor: req.body.hexcolor,
    }).then(topic => {
        res.status(200).json(`Topic ${topic.topic} Created`);
    }).catch(error => {
        res.status(400).json({message:error});
    })
}

// Update Topic
exports.update = function(req, res, next) {
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
        res.status(200).json("Topic Updated");
    }).catch(error => {
        res.status(400).json({message:error});
    })
}

// Delete Topic
exports.delete = function(req, res, next) {
    return models.Topic.destroy({
        where : {
            id : req.params.id
        }
    }).then(result => {
        res.status(200).json("Topic Deleted");
    }).catch(error => {
        res.status(400).json({message:error});
    });
}


// Change Topic Satus
exports.status = async function(req, res, next) {
    try {
        // Get Topic
        const topic = await models.Topic.findOne({
            where: { id: req.params.id }
        });
        if (topic.id > 0) {
            let topicStatus = {};
            if (topic.status) {
                topicStatus.status = false;
            } else {
                topicStatus.status = true;
            }
            return models.Topic.update(topicStatus, {
                where : {
                    id : topic.id
                }
            }).then(result => {
                if (topicStatus.status) {
                    res.status(200).json("Topic Status Active");
                } else {
                    res.status(200).json("Topic Status Inactive");
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