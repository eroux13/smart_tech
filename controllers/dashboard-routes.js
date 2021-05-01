// Import Dependencies
const router = require("express").Router();
const sequelize = require("./../config/connection");
const {Post, User, Comment} = require("./../models");
const withAuth = require("./../utils/auth");

// Render dashboard if user is logged in
router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id 
            },
            attributes: [
                "id",
                "post_content",
                "title",
                "created_at"
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at"
                    ],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
                {
                    model: User,
                    attributes: ["user_name"]
                }
            ],
        });

        const posts = postData.map((posts) => posts.get({plain: true}));

        res.render("dashboard", {
            posts,
            logged_in: true
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Edit post route
router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk({
            where: {
                id: req.params.id
            },
            attributes: [
                "id",
                "post_content",
                "title",
                "created_at"
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at"
                    ],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                },
                {
                    model: User,
                    attributes: ["user_name"]
                }
            ]
        });

        if (!postData) {
            res.status(404).json({message: "No post found!"});
            return;
        }

        const posts = postData.get({plain: true});

        res.render("edit-post", {
            posts,
            logged_in: true
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Edit logged in user
router.get("/edituser", withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            attributes: {exclude: ["password"]}
        });

        if (!userData) {
            res.status(404).json({message: "No user found!"});
            return;
        }

        const users = userData.get({plain: true});

        res.render("edit-user", {
            users,
            logged_in: true
        });

    }
    catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;