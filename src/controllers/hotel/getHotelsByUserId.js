const mongoose = require("mongoose");
const { Hotel, User } = require("../../models/index");

const getHotelsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (mongoose.isValidObjectId(userId)) {
            const user = await User.findById(userId)

            if(user){
                const hotelsByUser = await Hotel.find( { User_id : userId } );

                if(hotelsByUser.length > 0)
                    res.status(200).json(hotelsByUser);
                else
                    res.status(202).json({
                        "User name " : user.firstName + user.lastName,
                        "message"    : "Has no Hotels created"
                    });
                
            }
            else{
                res.status(404).json({"error":`User not found with provided { User_id : ${userId}}, please check it`})
            }
        }
        else {
            res.status(404).json({"error":`The provided { User_id : ${userId}} is not valid for mongoose ObjectId`})
        }

    } catch (error) {
        res.status(400).json({ error : error.message })
    }
};

module.exports = getHotelsByUserId;
