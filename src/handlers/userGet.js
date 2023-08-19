const User = require('../models/userModel');


const userGet = async (req, res) => {
    
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports = userGet;
