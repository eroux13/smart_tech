// Impost models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Create associations between models
// User associations
User.hasMany(Post, {
    foreignKey: "user_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true
});

// Post associations
Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Post.hasMany(Comment, {
    foreignKey: "post_id", 
    onDelete: "CASCADE",
    hooks: true
});

// Comment associations
Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
    hooks: true
})

module.exports = {User, Post, Comment};