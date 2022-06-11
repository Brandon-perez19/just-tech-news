const {Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

class Comment extends Model {}

Comment.init ({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        refrences: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        refrences: {
            model: 'post',
            key: 'id'
        }
    },

},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelname: 'comment'

});

module.exports = Comment;