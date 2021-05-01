// Import Dependencies
const router = require("express").Router();
const {Post, User, Comment} = require("./../../models");
const withAuth = require("./../../utils/auth");
const sequelize = require("./../../config/connection");

// GET api/posts
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                "id",
                "post_content",
                "title",
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
        })

        res.json(postData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// GET api/posts/:id
router.get("/:id", async (req, res) => {
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
        })
        if (!postData) {
            res.status(404).json({message: "No post found!"});
            return;
        }

        res.json(postData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// POST api/posts
router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post,
            user_id: req.session.user_id
        })

        res.json(postData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// PUT api/posts/:id
router.put("/:id", withAuth, async (req, res) => {
    try{
        const postData = await Post.update(req.body, {
            where: {id: req.params.id}
        })
        if(!postData){
            res.status(404).json({message: "No post found!"});
            return;
        }
        res.json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE api/posts/:id
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({message: "No post found!"});
            return;
        }
        res.json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;