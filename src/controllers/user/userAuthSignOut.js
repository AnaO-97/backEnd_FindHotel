const { firebase } = require("../../config");
const { User } = require("../../models");

const userAuthSignOut = async (req, res) => {
    const { email, password } = req.body;
    try {

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = userAuthSignOut;