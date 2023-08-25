const Deal = require('../../models/dealModel');

const getDealsUserById = async (req, res) => {
    const id = req.params.userId
    const dealUser = await Deal.aggregate([
        { $match: { User_id: mongoose.Types.ObjectId(id) } },
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
        {
            $project: {
                'user._id': 1,
                'user.firstName': 1,
                'user.lastName': 1,
                'user.email': 1,
                'user.country': 1,
                'user.city': 1,
            },
        },
        {
            $lookup: {
                from: 'hotels',
                localField: 'user.hotel.roomType.Hotel_id',
                foreignField: '_id',
                as: 'user.hotel',
            },
        },
        {
            $unwind: '$user.hotel',
        },
        {
            $project: {
                'user': 1,
                'user.hotel._id': 1,
                'user.hotel.name': 1,
                'user.hotel.rating': 1,
                'user.hotel.category': 1,
                'user.hotel.phone': 1,
                'user.hotel.address': 1,
            },
        },
        {
            $lookup: {
                from: 'roomtypes',
                localField: 'RoomType_id',
                foreignField: '_id',
                as: 'user.hotel.roomType',
            },
        },
        {
            $unwind: '$user.hotel.roomType',
        },
        {
            $project: {
                'user': 1,
                'user.hotel.roomType._id': 1,
                'user.hotel.roomType.name': 1,
                'user.hotel.roomType.price': 1,
                'user.hotel.roomType.stock': 1,
                'user.hotel.roomType.services': 1,
            },
        },
    ]);
};

module.exports = getDealsUserById;