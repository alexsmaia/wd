module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('Video', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        youtubeid: {
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
    
    Video.associate = function(models) {
        Video.belongsToMany(models.Topic, {through: 'TopicVideo'});
        Video.hasMany(models.Favorite)
    };

    return Video;
};