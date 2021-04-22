// Import Components from Sequelize Library
const { Model, DataTypes} = require('sequelize');
// Import DB Connection
const sequelize = require('./../config/connection');

class Post extends Model {}

// Set Up Fields and Rules for Model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }  
)
module.exports = Post;