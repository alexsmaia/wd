const models = require('../../models');
const token = require('../../utilities/token');


// List Items
exports.listAllActive = function(req, res) {
    token.getLogedId(req.headers.authorization, (logedId) => {
        if (logedId > 0) {
            return models.Favorite.findAll({
                where: { userId: logedId },
                attributes: ['videoId', 'userId'],
                include: { model: models.Video,
                    where: { status: 1},
                    attributes: ['id', 'title', 'youtubeid']
                }
            }).then(item => {
                res.status(200).json(item);
            }).catch (error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(400).json("Error");
        }
    })
}

// Add Item
exports.addRemove = function(req, res) {
    token.getLogedId(req.headers.authorization, (logedId) => {
        if (logedId > 0) {
            return models.Favorite.findOne({
                where: {
                    videoId: req.params.videoId,
                    userId: logedId
                }
            }).then(item => {
                if (item.id > 0) {
                    return item.destroy().then(result => {
                        if (result) {
                            res.status(200).json("Video removed from Favorites");
                        } else {
                            res.status(400).json("Error");
                        }
                    }).catch(error => {
                        res.status(400).json({message:error});
                    });
                } else {
                    return models.Favorite.create({
                        videoId: req.params.videoId,
                        userId: logedId
                    }).then(result => {
                        if (result) {
                            res.status(200).json(`Video added to Favorites`);
                        } else {
                            res.status(400).json("Error");
                        }
                    }).catch (error => {
                        res.status(400).json({message:error});
                    });
                }
            }).catch (error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(400).json("Error");
        }
    })
}
