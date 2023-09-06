const User = require("../../models/userModel");

const userDelete = async (req, res) => {
    const id = req.params._id;
    
    try {
        const inactiveUser = await User.updateOne({ email }, { status: "inactive" });
        if (inactiveUser.nModified === 0) {
            res.status(404).json({ message: 'User not found or no changes made' });
        } else {
            res.status(200).json({ message: 'User deactivated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = userDelete