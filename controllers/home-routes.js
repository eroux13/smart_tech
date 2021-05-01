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
                    include: {
                            model: User,
                            attributes: ["user_name"]
                    }
                }
            ]
        });

        const posts = postData.map((posts) => posts.get({plain: true}));

        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Render single post
router.get("/posts/:id", async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include:[
                {
                    model: User,
                    attributes: ["user_name"]
                },
                {
                    model: Comment,
                    attributes: ["comment_text"],
                    include: {
                        model: User,
                        attributes: ["user_name"]
                    }
                }
            ]
        });

        const posts = postData.get({plain: true});

        res.render("post", {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Render login page
router.get("/login", (req, res) => {
    // If user is logged in, redirect to home page
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

// Render sign up page
router.get("/signup", (req, res) => {
    // If user is already signed up and logged in, redirect to home page
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

module.exports = router;