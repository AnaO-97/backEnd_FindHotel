const User = require("../../models/userModel");


const userUpdate = async (id_userUpdate, atts_userUpdate) => {

    const userUpdated = await User.findByIdAndUpdate(
        id_userUpdate,
        atts_userUpdate,
        { new: true },
    );

    return userUpdated;
};

module.exports = userUpdate;
