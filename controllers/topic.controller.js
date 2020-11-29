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