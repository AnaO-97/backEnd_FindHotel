const User = require('../../models/userModel');

const usersFind = async () => {
    const users = await User.find({role:'Hotel'}, '_id');
    return users;
};

module.exports = usersFind;