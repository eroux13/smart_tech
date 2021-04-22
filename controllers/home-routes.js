// Import Dependencies
const router = require('express').Router();
const sequelize = require('./../config/connection');
const {Post, User, Comment} = require('./../models');

// Render the homepage
router.get("/", async (req,res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                "id",
                "title",
                "post_content",
                "created_at"
            ],
            order: [["created_at", "DESC"]],
            include: [
                {
                    model: User,
                    attributes: ["user_name"]
                },
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at"
                    ],
                    include: [
                        {
                            model: User,
                            attributes: ["user_name"]
                        }
                    ]
                }
            ]
        })

        const posts = postData.map((posts) => post.get({plain: true}));

        res.render("hompage", {
            posts,
            logged_in: req.session.logged_in
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
})