const Hotel = require('../../models/hotelModel');
const Deal = require('../../models/dealModel');
const mongoose = require("mongoose");

const getDealsByHotelId = async (req, res) => {
    const id = req.params.hotelId;
    
    if(mongoose.isValidObjectId(id)){
        const hotel = await Hotel.findById(id);

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
                    {
                        $unwind: '$hotel',
                    },
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
                    //--------------------**group**--------------------
                    {
                        $group: {
                            _id: '$Hotel_id',
                            dealsHotel : {
                                $first: '$hotel',
                            }, 
                            deals: {                                
                                $push: {
                                    status   : '$status',
                                    quantity : '$quantity',
                                    checkIn  : '$checkIn',
                                    checkOut : '$checkOut',
                                    user     : '$user',
                                    roomType : '$roomType',

                                },
                            },      
                        }
                    },
                    //--------------------**project**--------------------
                    {
                        $project : {
                            _id : 0,

                            dealsHotel : {
                                _id     : 1,
                                name    : 1,
                                address : 1,
                                country : 1,
                                state   : 1,
                                image   : 1,
                                category: 1,
                                services: 1,
                                roomService: 1,

                                deals : '$deals',                                                                 
                            },
                        }
                    }
                ]);
            
                if(dealsHotel.length>0){
                    res.status(200).json(dealsHotel[0]);
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