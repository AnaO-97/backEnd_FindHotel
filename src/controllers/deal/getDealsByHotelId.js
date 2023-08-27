const Hotel = require('../../models/hotelModel');
const Deal = require('../../models/dealModel');
const mongoose = require("mongoose");

const getDealsByHotelId = async (req, res) => {
    const id = req.params.hotelId;
    
    if(mongoose.isValidObjectId(id)){
        const hotel = await Hotel.findById(id);
        console.log("Si es id mongoose");

        if(hotel){
            try{
                const dealsHotel = await Deal.aggregate([
                    { $match: { Hotel_id: new mongoose.Types.ObjectId(id) } },
                    //--------------------**Hotel**--------------------
                    {                
                        $lookup: {                    
                            from: 'hotels',
                            localField: 'Hotel_id',
                            foreignField: '_id',
                            as: 'hotel',
                        },
                    },
                    {// Ordenar por marca de tiempo (timestamp) descendente
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $unwind: '$hotel',
                    },
                    //--------------------**User**--------------------
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'User_id',
                            foreignField: '_id',
                            as: 'hotel.user',
                        },
                    },
                    {
                        $unwind: '$hotel.user',
                    },
                    //--------------------**RoomType**--------------------
                    // {
                    //     $lookup: {
                    //         from: 'roomtypes',
                    //         localField: 'RoomType_id',
                    //         foreignField: '_id',
                    //         as: 'hotel.user.roomType',
                    //     },
                    // },
                    // {
                    //     $unwind: '$hotel.user.roomType',
                    // },
                    //--------------------**project**--------------------
                    {
                        $project: {
                            'status' : 1,
        
                            'hotel._id' : 1,
                            'hotel.name': 1,
                            'hotel.address': 1,
                            'hotel.category': 1,
                            // 'hotel.phone': 1,
                            // 'hotel.rating': 1,
        
                            'hotel.user._id'  : 1,
                            'hotel.user.role' : 1,
                            'hotel.user.email': 1,
                            // 'hotel.user.firstName' : 1,
                            // 'hotel.user.lastName' : 1,                    
        
                            // 'hotel.user.roomtypes._id': 1,
                            // 'hotel.user.roomtypes.name': 1,
                            // 'hotel.user.roomtypes.price': 1,
                            // 'hotel.user.roomtypes.roomServices': 1,        
                        }
                    }

                    // {
                    //     $group : { 
                    //         _id : '$_id',
                    //         hotel : { $first : '$hotel' }
                    //     }
                    // }
                ]);
            
                if(dealsHotel.length>0){
                    res.status(200).json(dealsHotel);
                }
                else{
                    res.status(202).json({"message": `No deals found for {${hotel._id} : ${hotel.name}}`})
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).json({error: error.message})
            }
        }
        else{
            res.status(404).json({"error":"Hotel not found with provided ID, please check it"})
        }
    }
    else{
        console.log("No es id mongoose");
        res.status(404).json({"error":"The provided Hotel_id is not valid for mongoose ID's"})
    }
};

module.exports = getDealsByHotelId;