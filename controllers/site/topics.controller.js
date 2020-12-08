const models = require('../../models');

// Get List of Items
exports.listAll = function(req, res) {
    return models.Topic.findAll({
        where: { status: 1 },
        attributes: ['id', 'topic', 'description', 'hexcolor']
    }).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id
exports.getItem = function(req, res) {
    return models.Topic.findOne({
        where: [{ id: req.params.id }, {"status": 1}],
        attributes: ['id', 'topic', 'description', 'hexcolor']
    }).then(item => {
        res.status(200).json(item);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}

// Get Item by Id with relations
exports.getItemRelations = function(req, res) {
    return models.Topic.findOne({
        where: [{ id: req.params.id }, {"status": 1}],
        attributes: ['id', 'topic', 'description', 'hexcolor'],
        include: { model: models.Video,
            where: { status: 1},
            attributes: ['id', 'title', 'youtubeid']
        }
    }).then(item => {
        res.status(200).json(item);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}
