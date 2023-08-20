
const user = require('../models/userModel');

const userGet= async (attributes) => {
    const newUser= new user(attributes);
    return await newUser.save();
};

module.exports = userGet;