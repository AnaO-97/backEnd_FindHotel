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
        { $match: 
            { 
                Hotel_id: new mongoose.Types.ObjectId(id), 
                [ queryAtt ]  :  queryValue
            }
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
                        res.status(200).json(dealsHotel[0]);
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