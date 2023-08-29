const { Hotel, RoomType } = require("../../models/index");
const mongoose = require("mongoose");

const getRoomTypesById =  async(id) => {   
    const roomTypesFound = await RoomType.aggregate([
        { $match: { User_id: new mongoose.Types.ObjectId(id) } },            
        //--------------------**User**--------------------
        {
            $lookup: {
                from: 'users',
                localField: 'User_id',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $project: {
                'name': 1,
                'price': 1,
                'stock':1,
                'isActive':1,
                'services': 1,        

                'user._id'  : 1,
                'user.role' : 1,
                'user.email': 1,
                // 'user.firstName' : 1,
                // 'user.lastName' : 1,
            }
        }
    ]); 
    
    return roomTypesFound;
};

const getRoomTypesByHotelId = async (req,res ) => {
    try {        
        const hotelId = req.params.hotelId;
            
        if(mongoose.isValidObjectId(hotelId)){            
            const hotel = await Hotel.findById(hotelId);          
            
            if(hotel){
                const userId = hotel.User_id;                
                console.log("userId-controller", userId);
                
                const roomTypesFound = await getRoomTypesById(userId);
                
                if(roomTypesFound.length>0)
                    res.status(200).json(roomTypesFound);
                else
                    res.status(202).json({
                        "Hotel": hotel.name,
                        "id   ": hotelId,
                        "message": "There are no RoomTypes"
                    });
            }
            else{
                res.status(404).json({"error":"Not found Hotel with the provided ID, please check it"})
            }
        }
        else{
            res.status(404).json({"error":"The provided --> id <-- is not valid for mongoose ID's"})
        }
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = getRoomTypesByHotelId;