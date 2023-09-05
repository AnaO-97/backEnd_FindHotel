const { HotelRoom, User } = require('../../models/index');
const mongoose = require("mongoose");

const getHotelRoomByPrice = async (req, res) => {
    const { minPrice, maxPrice } = req.params;

    if (parseFloat(minPrice) > 0 && parseFloat(minPrice) < parseFloat(maxPrice)) {
        try {
            const hotelRoomByPrice = await HotelRoom.aggregate([
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
                {
                    $match: {
                        'rooms.value': {
                            $gte: minPrice, // Precio mínimo
                            $lte: maxPrice, // Precio máximo
                        },
                    },
                },
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
                        'hotel.rooms': {
                            $filter: {
                                input: '$rooms',
                                as: 'room',
                                cond: {
                                    $and: [
                                        { $gte: ['$$room.value', minRoomValue] },
                                        { $lte: ['$$room.value', maxRoomValue] },
                                    ],
                                },
                            },
                        },
                    },
                },
                {
                    $match: {
                        'hotel.rooms.price': { $lt: maxRoomValue }
                    },
                },
            ]);

            if (hotelRoomByPrice.length > 0) {
                res.status(200).json(hotelRoomByPrice);
            }
            else {
                res.status(404).json({ "message": `No rooms Hotel found for {${user._id} : ${user.email}}` })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message })
        }
    }
    else {
        res.status(404).json({ "error": "User not found with provided ID, please check it" })
    }

}

module.exports = getHotelRoomByPrice;