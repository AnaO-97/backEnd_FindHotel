const mongoose = require('mongoose')
const { Deal, Hotel, User, RoomType } = require("../../models");

const getDealsHotelByHotelId = async (req, res) => {

    try {
        const { hotelId } = req.params
        const dealsHotel =
            Hotel.aggregate([
                { $match: { Hotel_id: mongoose.Types.ObjectId(hotelId) } },
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
                    $lookup: {
                        from: 'hotels',
                        localField: 'Hotel_id',
                        foreignField: '_id',
                        as: 'hotel'
                    }
                },
                {
                    $unwind: '$hotel'
                },
                {
                    $project: {
                        _id: 0,
                        hotelInfo: {
                            name: '$hotel.name',
                            email: '$hotel.email',
                            country: '$hotel.country',
                            city: '$hotel.state',
                            address: '$hotel.address',
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

module.exports = getDealsHotelByHotelId