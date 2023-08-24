const User = require("../../models/userModel");

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.find({ email });
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = getUserByEmail;