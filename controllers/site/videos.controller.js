const models = require('../../models');

// Get Video details by Id
exports.video = function(req, res) {
    return models.Video.findOne({
        where: [
            { id: req.params.id }, 
            {"status": 1}
        ],
        attributes: ['id', 'title', 'youtubeid'],
        include: { model: models.Topic,
            where: { status: 1},
            attributes: ['id', 'topic', 'description']
        }
    }).then(video => {
        res.status(200).json(video);
    }).catch(error => {
        res.status(400).json({message:error});
    });
}
