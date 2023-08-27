const { User, Hotel, RoomType } = require("../models");

const validate_IDs = (req,res,next) => {
    const { id } = req.params;

    if(mongoose.isValidObjectId(id)){
        const shema = await Hotel.findById(id);
        console.log("Si es id mongoose");
    }
};

module.exports = validate_IDs;