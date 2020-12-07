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

// Get Video details by Id
exports.video = function(req, res) {
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

// Get Video details by Id with relations
exports.videoRelations = function(req, res) {
    let item = {};
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
    }).then(video => {
        if (video) {
            item.video = video;
            return models.Comment.findAll({
                where: [
                    { videoId: video.id }, 
                    {"status": 1}
                ],
            }).then(comments => {
                item.comments = comments;
                res.status(200).json(item);
            }).catch(error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(200).json(null);
        }
    }).catch(error => {
        res.status(400).json({message:error});
    });
}
