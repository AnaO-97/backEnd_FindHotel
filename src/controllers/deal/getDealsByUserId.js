const User = require('../../models/userModel');
const Deal = require('../../models/dealModel');
const mongoose = require("mongoose");

const getDealsByUserId = async (req, res) => {
    const id = req.params.userId;
    
    if(mongoose.isValidObjectId(id)){
        const user = await User.findById(id);

        if(user){
            try {
                const dealsUser = await Deal.aggregate([
                    { $match: { User_id: new mongoose.Types.ObjectId(id) }},
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
                    //--------------------**group**--------------------
                    {
                        $group: {
                            _id: '$User_id',
                            dealsUser : {
                                $first: '$user',
                            }, 
                            deals: {                                
                                $push: {
                                    status   : '$status',
                                    quantity : '$quantity',
                                    checkIn  : '$checkIn',
                                    checkOut : '$checkOut',
                                    hotel    : '$hotel',
                                    roomType : '$roomType',
                                },
                            },      
                        }
                    },
                    //--------------------**project**--------------------
                    {
                        $project : {
                            _id : 0,
            
                            dealsUser : {
                                _id : 1,
                                firstName : 1,
                                lastName  : 1,
                                email : 1,
                                image : 1,
                                age   : 1,
                                phone : 1,
                                country : 1,
                                state   : 1,
                                role    : 1,
                                status  : 1,

                                deals : '$deals',                                                                 
                            },
                        }
                    }
                ]);
            
                if(dealsUser.length>0){
                    res.status(200).json(dealsUser[0]);
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