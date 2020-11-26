const models = require('../models');

exports.users = async function(req, res, next) {
    try {
        const users = await models.User.findAll({
            attributes: ['username', 'email']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error});

    }
}