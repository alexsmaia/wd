
module.exports = (sequelize, DataTypes) => {
    var Topic = sequelize.define('Topic', {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    return Topic;
};