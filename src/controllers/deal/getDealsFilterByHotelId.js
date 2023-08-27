const Deal = require("../../models/dealModel");
const Hotel = require("../../models/hotelModel");
const mongoose = require("mongoose");

const getDealsByAttribute =  async(queryAtt, queryValue, id) => {
    if (queryAtt === "checkIn" || queryAtt === "checkOut"){
        const milisegundos = Date.parse(queryValue);
        queryValue = new Date(milisegundos);

        console.log(queryValue);
    }
    
    const dealsHotel = await Deal.aggregate([
        { $match: { Hotel_id: new mongoose.Types.ObjectId(id), 
                    [ queryAtt ]  :  queryValue
        }},
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
    ]); 
    
    return dealsHotel;
};

const getDealsFilterByHotelId = async (req,res ) => {
    try {
        
        const qeuryAtt_enum = [ "status", "checkIn", "checkOut" ]
        const [ [ queryAtt, queryValue ] ] = Object.entries(req.query);
        
        if(qeuryAtt_enum.includes(queryAtt)){
            const status_enum = ["booking", "purchase", "cancelled", "active", "finished"];
            
            if(queryAtt === 'status' && !status_enum.includes(queryValue))
             return res.status(402).json({"error": `The received { status : ${ queryValue }}, check it`});
        
            const id = req.params.hotelId;
            
            if(mongoose.isValidObjectId(id)){            
                const hotel = await Hotel.findById(id);
    
                if(hotel){
                    const dealsHotel = await getDealsByAttribute(queryAtt, queryValue, id);
                    
                    if(dealsHotel.length>0)
                        res.status(200).json(dealsHotel);
                    else
                        res.status(202).json({
                            "hotel_name" : hotel.name,
                            [ queryAtt ] : queryValue,
                            "message"    : "There are no deals"
                        });
                }
                else{
                    res.status(404).json({"error":"Hotel not found with provided ID, please check it"})
                }
            }
            else{
                res.status(404).json({"error":"The provided Hotel_id is not valid for mongoose ID's"})
            }

        }
        else{
            res.status(402).json({
                "error": `The received { query : ${ queryAtt }}, check it`,
                "match filter" : qeuryAtt_enum
            });
        }
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = getDealsFilterByHotelId;