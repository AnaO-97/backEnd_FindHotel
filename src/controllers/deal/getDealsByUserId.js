const User = require('../../models/userModel');
const Deal = require('../../models/dealModel');
const mongoose = require("mongoose");

const getDealsByUserId = async (req, res) => {
    const id = req.params.userId;
    
    if(mongoose.isValidObjectId(id)){
        const user = await User.findById(id);
        console.log("Si es id mongoose");

        if(user){
            try {
                const dealsUser = await Deal.aggregate([
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
                    {// Ordenar por marca de tiempo (timestamp) descendente
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                    //--------------------**Hotel**--------------------
                    {
                        $lookup: {
                            from: 'hotels',
                            localField: 'Hotel_id',
                            foreignField: '_id',
                            as: 'user.hotel',
                        },
                    },
                    {
                        $unwind: '$user.hotel',
                    },
                    //--------------------**RoomType**--------------------
                    // {
                    //     $lookup: {
                    //         from: 'roomtypes',
                    //         localField: 'RoomType_id',
                    //         foreignField: '_id',
                    //         as: 'user.hotel.roomType',
                    //     },
                    // },
                    // {
                    //     $unwind: '$user.hotel.roomType',
                    // },
                    //--------------------**project**--------------------
                    {
                        $project: {
                            'status':1,
        
                            'user._id'  : 1,
                            'user.role' : 1,
                            'user.email': 1,
                            // 'user.firstName' : 1,
                            // 'user.lastName' : 1,                    
        
                            'user.hotel._id' : 1,
                            'user.hotel.name': 1,
                            'user.hotel.address': 1,
                            'user.hotel.category': 1,
                            // 'user.hotel.phone': 1,
                            // 'user.hotel.rating': 1,
        
                            // 'user.hotel.roomtypes._id': 1,
                            // 'user.hotel.roomtypes.name': 1,
                            // 'user.hotel.roomtypes.price': 1,
                            // 'user.hotel.roomtypes.roomServices': 1,
        
                        },
                    },
                ]);
            
                if(dealsUser.length>0){
                    res.status(200).json(dealsUser);
                }
                else{
                    res.status(404).json({"message": `No deals found for {${user._id} : ${user.email}}`})
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

module.exports = getDealsByUserId;