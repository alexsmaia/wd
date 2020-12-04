module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hexcolor: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
    });
    
    Topic.associate = function(models) {
        Topic.belongsToMany(models.Video, {through: 'TopicVideo'});
    };

    return Topic;
};