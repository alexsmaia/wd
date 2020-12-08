const models = require('../../models');

// Get List of Items
exports.listAll = function(req, res) {
    return models.Video.findAll({
        where: { status: 1 },
        attributes: ['id', 'title', 'youtubeid']
    }).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get List of Items with Topic Info
exports.listAllTopics = function(req, res) {
    return models.Video.findAll({
        where: { status: 1 },
        attributes: ['id', 'title', 'youtubeid'],
        include: { model: models.Topic,
            attributes: ['id', 'topic', 'hexcolor']
        }
    }).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get Item details by Id
exports.getItem = function(req, res) {
    return models.Video.findOne({
        where: [
            { id: req.params.id }, 
            {"status": 1}
        ],
        attributes: ['id', 'title', 'youtubeid'],
        include: [
            { model: models.Topic,
                where: { status: 1},
                attributes: ['id', 'topic', 'description']
            }
        ]
    }).then(item => {
        res.status(200).json(item);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id with relations
exports.getItemRelations = function(req, res) {
    return models.Video.findOne({
        where: [
            { id: req.params.id }, 
            {"status": 1}
        ],
        attributes: ['id', 'title', 'youtubeid'],
        include: [
            { model: models.Topic,
                where: { status: 1},
                attributes: ['id', 'topic', 'description']
            },
            { model: models.Comment,
                where: { status: 1},
                attributes: ['id', 'comment'],
                include: {
                    model: models.User,
                    attributes: ['id', 'username']
                }
            }
        ]
    }).then(item => {
        res.status(200).json(item);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get List of Recent Items with Limit
exports.recent = function(req, res) {
    return models.Video.findAll({
        where: { status: 1 },
        attributes: ['id', 'title', 'youtubeid'],
        order: [
            ['createdAt', 'DESC']
        ],
        limit: parseInt(req.params.limit),
    }).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}
