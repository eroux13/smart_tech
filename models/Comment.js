// Import Components from Sequelize Library
const { Model, DataTypes} = require('sequelize');
// Import DB Connection
const sequelize = require('./../config/connection');

class Comment extends Model {}

// Set Up Fields and Rules for Model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }  
)
module.exports = Comment;