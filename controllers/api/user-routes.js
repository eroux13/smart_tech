//  Import Dependencies
const router = require("express").Router();
const {Post, User, Comment} = require("./../../models");
const session = require("express-session");
const withAuth = require("./../../utils/auth");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// GET Route /api/users
router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ["password"]}
        })

        res.json(userData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// GET Route /api/users/:id
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: {exclude: ["password"]},
            include: [
                {
                    model: Post,
                    attributes: [
                        "id",
                        "title",
                        "post_content",
                        "created_at"
                    ]
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
                        model: Post,
                        attributes: ["title"]
                    }
                }
            ]
        })
        if (!userData) {
            res.status(404).json({message: "No user found!"});
            return;
        }

        res.json(userData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// POST api/users
router.post("/", async (req, res) => {
    try {
        const userData = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req,body,password
        })

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.user_name;
            req.session.logged_in = true;

            res.json(userData);
        })

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// POST api/users/login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});

        if(!userData){
            res.status(400).json({message: "No user found with this email!"});
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({message: "Password is incorect!"});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.user_name;
            req.session.logged_in = true;

            res.json({user: userData, message: "Login in successful!"});
        })

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// POST api/users/logout
router.post("/logout", withAuth, async (req, res) => {
    try {
        if(req.session.logged_in){
            res.session.destroy(() => {
                res.status(204).end();
            })
        }
        else {
            res.status(404).end();
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// PUT api/users/:id
router.put("/:id", withAuth, async (req, res) => {
    try{
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {id: req.params.id}
        })
        if(!userData[0]){
            res.status(404).json({message: "No user found!"});
            return;
        }
        res.json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE api/users/:id
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!userData) {
            res.status(404).json({message: "No user found!"});
            return;
        }
        res.json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;