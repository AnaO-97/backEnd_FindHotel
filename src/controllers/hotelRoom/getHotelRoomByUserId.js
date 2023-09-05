const { HotelRoom, User } = require('../../models/index');
const mongoose = require("mongoose");

const getHotelRoomByUserId = async (req, res) => {
    const id = req.params.userId;

    if (mongoose.isValidObjectId(id)) {
        const user = await User.findById(id);

        if (user) {
            try {
                const hotelRoomByUser = await HotelRoom.aggregate([
                    { $match: { User_id: new mongoose.Types.ObjectId(id) } },
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
                ]);

                if (hotelRoomByUser.length > 0) {
                    res.status(200).json(hotelRoomByUser);
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
    else {
        console.log("No es id mongoose");
        res.status(404).json({ "error": "The provided User_id is not valid for mongoose ID's" })
    }
};

module.exports = getHotelRoomByUserId;