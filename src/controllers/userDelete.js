const User = require('../models/userModels');

const userDelete = async (req, res) => {
    const id = req.params._id;
    try {
        const inactiveUser = await User.updateOne({email},{status:"Inactive"});
        if (!inactiveUser) {
            res.status(404).json({ message: 'User Not found' });
        } else {
            res.status(200).json({ message: 'User desactivated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = userDelete