const user = require('../models/userModels');

const userDelete = async (req, res) => {
    const id = req.params._id;
    try {
        const deletedUser = await user.deleteUserById(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'Not found' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = userDelete