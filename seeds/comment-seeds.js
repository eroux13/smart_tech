// Import Comment Model
const Comment = require('./../models/Comment');

// Comment Seeds
const commentData = 
[
    {
        comment_text: "AI is the future! I better start learning more about it!",
        post_id: 1,
        user_id: 3
    },
    {
        comment_text: "Isn't there a movie about AI and robots taking over the world?!",
        post_id: 1,
        user_id: 4
    },
    {
        comment_text: "IoT will definitely be one of the most trending topics in the future!",
        post_id: 2,
        user_id: 1
    },
    {
        comment_text: "I heard Facebook developed some apps that use AR!",
        post_id: 3,
        user_id: 2
    },
    {
        comment_text: "Blockchain is so cool!!",
        post_id: 4,
        user_id: 5
    },
    {
        comment_text: "Wow, ML and AI go hand-in-hand!",
        post_id: 5,
        user_id: 1
    },
]

// Bulk create comment seeds
const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;