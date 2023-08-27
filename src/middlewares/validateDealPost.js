const { User, Hotel, RoomType } = require("../models");

const validateDealPost = async (req, res, next) =>{
    const post = {
        User_id     : req.body.User_id,
        Hotel_id    : req.body.Hotel_id, 
        RoomType_id : req.body.RoomType_id,
    }

    const validations = {};

    validations.isUserId     = await User.findById({_id: post.User_id});
    validations.isHotelId    = await Hotel.findById({_id: post.Hotel_id});
    validations.isRoomTypeId = await RoomType.findById({_id: post.RoomType_id});

    if(Object.values(validations).includes(null)){    
        for (const key in validations) {        
            if (validations[key] === null) {
            // console.log(key,validations[key]);
                return (
                    res
                    .status(404)
                    .json({"error": `The ID ${key.slice(2,-2)} not found in the database, please check it`})
                )
            }
        }        
    }
    else{
        next();
    }
};

module.exports= validateDealPost;