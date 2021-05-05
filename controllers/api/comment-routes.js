// Import Dependencies
const router = require("express").Router();
const {Comment} = require("./../../models");
const withAuth = require("./../../utils/auth");

// GET api/comments
router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.json(commentData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// POST api/comments
router.post("/", withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment,
            post_id: req.body.postID,
            user_id: req.session.user_id
        })

        res.json(commentData);

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE api/comments/:id
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({message: "No comment found!"});
            return;
        }
        res.json(commentData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;