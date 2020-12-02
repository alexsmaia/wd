const models = require('../../models');

// Get List of Topics
exports.topics = function(req, res) {
    return models.Topic.findAll({
        where: { status: 1 },
        attributes: ['id', 'topic', 'description']
    }).then(topics => {
        res.status(200).json(topics);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get Topic by Id
exports.topic = function(req, res) {
    return models.Topic.findOne({
        where: [{ id: req.params.id }, {"status": 1}],
        attributes: ['id', 'topic', 'description'],
        include: { model: models.Video,
            where: { status: 1},
            attributes: ['id', 'title', 'youtubeid']
        }
    }).then(topic => {
        res.status(200).json(topic);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}
