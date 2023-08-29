const { HotelRoom, User } = require('../../models/index');
const mongoose = require("mongoose");

const getHotelRoomByUserId = async (req, res) => {
    const id = req.params.userId;
    
    if(mongoose.isValidObjectId(id)){
        const user = await User.findById(id);

        if(user){
            try {
                const hotelRoomByUser = await HotelRoom.aggregate([
                    { $match: { User_id: new mongoose.Types.ObjectId(id) } },
                    //--------------------**User**--------------------
                    // {                
                    //     $lookup: {                    
                    //         from: 'users',
                    //         localField: 'User_id',
                    //         foreignField: '_id',
                    //         as: 'user',
                    //     },
                    // },
                    // {// Ordenar por marca de tiempo (timestamp) descendente
                    //     $sort: {
                    //         createdAt: -1,
                    //     },
                    // },
                    // {
                    //     $unwind: '$user',
                    // },
                    //--------------------**Hotel**--------------------
                    {
                        $lookup: {
                            from: 'hotels',
                            localField: 'Hotel_id',
                            foreignField: '_id',
                            as: 'hotel',
                        },
                    },
                    {
                        $unwind: '$hotel',
                    },
                    //--------------------**RoomType**--------------------
                    {
                        $lookup: {
                            from: 'roomtypes',
                            localField: 'RoomType_id',
                            foreignField: '_id',
                            as: 'roomType',
                        },
                    },
                    {
                        $unwind: '$roomType',
                    },
                    //--------------------**project**--------------------
                    {
                        $project: {  
                            // '_id' : 1,

                            // '_id'  : 1,
                            // 'role' : 1,
                            // 'email': 1,
                            // 'firstName' : 1,
                            // 'lastName' : 1,                    
        
                            'hotel._id' : 1,
                            'hotel.name': 1,
                            'hotel.address': 1,
                            'hotel.category': 1,
                            // 'hotel.phone': 1,
                            // 'hotel.rating': 1,
                           
                            'roomType._id': 1,
                            'roomType.name': 1,
                            'roomType.price': 1,
                            'roomType.services': 1,  
                        },
                    }
                    // {
                    //     $group : 
                    //     { 
                    //         _id   : '$hotel', 
                    //         count : {$sum : 1}
                        
                    //     }
                    // },
                    // {
                    //     $out : 'hotels'
                    // }
                ]);
            
                if(hotelRoomByUser.length>0){
                    res.status(200).json(hotelRoomByUser);
                }
                else{
                    res.status(404).json({"message": `No rooms Hotel found for {${user._id} : ${user.email}}`})
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({error: error.message})
            }
        }
        else{
            res.status(404).json({"error":"User not found with provided ID, please check it"})
        }
    
    }
    else{
        console.log("No es id mongoose");
        res.status(404).json({"error":"The provided User_id is not valid for mongoose ID's"})
    }
};

module.exports = getHotelRoomByUserId;