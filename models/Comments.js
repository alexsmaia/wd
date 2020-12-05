module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        videoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
        archived: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
    });
    
    Comment.associate = function(models) {
        Comment.belongsTo(models.User)
        Comment.belongsTo(models.Video)
    };

    return Comment;
};