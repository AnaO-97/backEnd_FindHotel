const User = require("../../models/userModel");

const userCreate = async (attributes) => {
    const newUser = new User(attributes);
    return await newUser.save()
};

module.exports = userCreate;
