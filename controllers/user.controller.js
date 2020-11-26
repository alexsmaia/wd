const models = require('../models');

exports.users = async function(req, res, next) {
    try {
        const users = await models.User.findAll({
            attributes: ['id', 'username', 'email', 'role_id']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error});

    }
}