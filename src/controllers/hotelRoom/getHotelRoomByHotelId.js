const { HotelRoom, Hotel } = require('../../models/index');
const mongoose = require("mongoose");

const getHotelRoomByHotelId = async (req, res) => {
    const id = req.params.hotelId;

    if (mongoose.isValidObjectId(id)) {
        const hotel = await Hotel.findById(id);

        if (hotel) {
            try {
                const hotelRoomByUser = await HotelRoom.aggregate([
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
                    // //--------------------**User**--------------------
                    // {
                    //     $lookup: {
                    //         from: 'users',
                    //         localField: 'User_id',
                    //         foreignField: '_id',
                    //         as: 'user',
                    //     },
                    // },
                    // {
                    //     $unwind: '$user',
                    // },
                    //--------------------**RoomType**--------------------
                    {
                        $lookup: {
                            from: 'roomtypes',
                            localField: 'RoomType_id',
                            foreignField: '_id',
                            as: 'rooms',
                        },
                    },
                    {
                        $unwind: '$rooms',
                    },
                    //--------------------**project**--------------------
                    {
                        $group: {
                            _id: '$Hotel_id', // Agrupa por el ID del hotel
                            hotel: {
                                $first: '$hotel',
                            },
                            rooms: {
                                $push: '$rooms',
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0, // Oculta el ID del grupo
                            hotel: {
                                _id: 1,
                                name: 1,
                                address: 1,
                                country: 1,
                                state: 1,
                                image: 1,
                                roomService: 1,
                                services: 1,
                                category: 1,
                            },
                            'hotel.rooms': '$rooms',
                        },
                    },
                    // {
                    //     $group: {
                    //         _id: '$user._id',
                    //         totalQuantity: { $sum: '$user' },  // Suma de la cantidad por producto
                    //         totalPrice: { $sum: { $multiply: ['$quantity', '$price'] } }  // Suma del precio total por producto
                    //     }
                    // }
                ])

                if (hotelRoomByUser.length > 0) {
                    res.status(200).json(hotelRoomByUser);
                }
                else {
                    res.status(404).json({ "message": `No rooms Hotel found for {${hotel._id} : ${hotel.name}}` })
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({ error: error.message })
            }
        }
        else {
            res.status(404).json({ "error": "Hotel not found with provided ID, please check it" })
        }

    }
    else {
        console.log("No es id mongoose");
        res.status(404).json({ "error": "The provided Hotel_id is not valid for mongoose ID's" })
    }
};

module.exports = getHotelRoomByHotelId;