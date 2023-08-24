const User = require("../../models/userModel");

const userFindById = async (id) => {
    return User.findById(id);
};

module.exports = userFindById;