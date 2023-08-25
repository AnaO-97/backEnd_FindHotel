const { User } = require("../..//userModel");

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const user = await User.find({ email })
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = getUserByEmail;