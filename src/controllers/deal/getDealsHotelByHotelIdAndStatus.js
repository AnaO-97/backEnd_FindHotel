const mongoose = require('mongoose');

const getDealsHotelByHotelIdAndStatus = async (req, res) => {
    try {
        const { hotelId } = req.params
        const { status } = req.query
        const dealsHotel =
            Deal.aggregate([
                {
                    $match: {
                        Hotel_id: mongoose.Types.ObjectId(hotelId),
                        status: status
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'User_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'roomtypes',
                        localField: 'RoomType_id',
                        foreignField: '_id',
                        as: 'roomType'
                    }
                },
                {
                    $unwind: '$roomType'
                },
                {
                    $project: {
                        _id: 0,
                        hotelInfo: {
                            room: {
                                _id: '$roomType._id',
                                name: '$roomType.name',
                                price: '$roomType.price',
                                stock: '$roomType.stock',
                                users: [
                                    {
                                        _id: '$user._id',
                                        firstName: '$user.firstName',
                                        lastName: '$user.lastName',
                                        email: '$user.email',
                                        deal: {
                                            checkIn: '$checkIn',
                                            checkOut: '$checkOut',
                                            status: '$status'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]);

        if (dealsHotel.length !== 0) res.status(200).json(dealsHotel)
        else res.status(404).json({ message: 'Deals not found' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = getDealsHotelByHotelIdAndStatus