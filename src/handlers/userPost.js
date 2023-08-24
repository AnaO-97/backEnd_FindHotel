const userCreate = require("../controllers/user/userCreate.js");

const userPost = async (req, res) => {
    try {
        const attributes = req.body;
        const newUser = await userCreate(attributes);
        res.status(200).json(newUser)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = userPost;