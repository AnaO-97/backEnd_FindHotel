const User = require("../models/userModel");

// const callBack = (err, userUpdated) => {
//     if (err)
//         throw new Error(err);
    
//     return userUpdated
// };

const userUpdate = async (userUpDate_Obj) => {
    const { id_userUpdate, atts_userUpdate }  = userUpDate_Obj;  

    const userUpdated = await User.findByIdAndUpdate( 
        id_userUpdate,
        atts_userUpdate,
        { new: true }
    );

    return userUpdated;
};

module.exports = userUpdate;
