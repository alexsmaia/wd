const models = require('../../models');
const token = require('../../utilities/token');


// List Items
exports.listAll = function(req, res) {
    token.getLogedId(req.headers.authorization, (logedId) => {
        if (logedId > 0) {
            return models.Comment.findAll({
                where: {
                    userId: logedId,
                    archived: 0,
                }
            }).then(items => {
                res.status(200).json(items);
            }).catch (error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(400).json("Error");
        }
    })
}

// Add new Iten
exports.add = function(req, res) {
    token.getLogedId(req.headers.authorization, (logedId) => {
        if (logedId > 0) {
            return models.Comment.create({
                userId: logedId,
                videoId: req.body.videoId,
                comment: req.body.comment,
                status: true,
            }).then(result => {
                if (result) {
                    res.status(200).json(`Comment Created`);
                } else {
                    res.status(400).json("Error");
                }
            }).catch (error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(400).json("Error");
        }
    });
}

// Archive Comment
exports.archive = function(req, res) {
    token.getLogedId(req.headers.authorization, (logedId) => {
        if (logedId > 0) {
            return models.Comment.findOne({
                where: { id: req.params.id }
            }).then(item => {
                if (item.id > 0 && item.userId == logedId) {
                    let itemArchived = {};
                    itemArchived.archived = 1;
                    return models.Comment.update(itemArchived, {
                        where : { id : item.id }
                    }).then(result => {
                        if (result) {
                            res.status(200).json(`Comment Archived`);
                        } else {
                            res.status(400).json("Error");
                        }
                    }).catch(error => {
                        res.status(400).json({message:error});
                    });
                } else {
                    res.status(400).json("Error");
                }
            }).catch (error => {
                res.status(400).json({message:error});
            });
        } else {
            res.status(400).json("Error");
        }
    })
}
