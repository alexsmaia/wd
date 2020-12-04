module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        videoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Favorite.associate = function(models) {
        Favorite.belongsTo(models.User)
        Favorite.belongsTo(models.Video)
    };
    

    return Favorite;
};