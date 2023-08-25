const mongoose = require('mongoose')
const { Deal } = require("../../models");

const getDealsUserByUserId = async (req, res) => {
    const id = req.params.userId
    const dealUser = await Deal.aggregate([
        // Match deals based on User_id
        {
            $match: { User_id: mongoose.Types.ObjectId(id) }
        },
        // Lookup user information
        {
            $lookup: {
                from: 'users',
                localField: 'User_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        // Sort by createdAt timestamp in descending order
        {
            $sort: {
                createdAt: -1
            }
        },
        // Unwind user array
        {
            $unwind: '$user'
        },
        // Lookup hotel information
        {
            $lookup: {
                from: 'hotels',
                localField: 'user.hotel.roomType.Hotel_id',
                foreignField: '_id',
                as: 'user.hotel'
            }
        },
        // Unwind hotel array
        {
            $unwind: '$user.hotel'
        },
        // Lookup room type information
        {
            $lookup: {
                from: 'roomtypes',
                localField: 'RoomType_id',
                foreignField: '_id',
                as: 'user.hotel.roomType'
            }
        },
        // Unwind room type array
        {
            $unwind: '$user.hotel.roomType'
        },
        // Project selected fields for user, hotel, and room type
        {
            $project: {
                'user._id': 1,
                'user.firstName': 1,
                'user.lastName': 1,
                'user.email': 1,
                'user.country': 1,
                'user.city': 1,
                'user.hotel._id': 1,
                'user.hotel.name': 1,
                'user.hotel.rating': 1,
                'user.hotel.category': 1,
                'user.hotel.phone': 1,
                'user.hotel.address': 1,
                'user.hotel.roomType._id': 1,
                'user.hotel.roomType.name': 1,
                'user.hotel.roomType.price': 1,
                'user.hotel.roomType.stock': 1,
                'user.hotel.roomType.services': 1
            }
        }
    ]);
};

module.exports = getDealsUserByUserId;