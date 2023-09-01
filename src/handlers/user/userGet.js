
const usersFind = require('../../controllers/user/usersFind')

const userGet = async (req, res) => {

    try {
        const users = await usersFind()
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports = userGet;
