const Hotel = require("../../models/hotelModel");
const HotelRoom = require('../../models/hotelRoomModel')
const RoomType = require('../../models/roomTypeModel')


const getHotelList = async (key, name) => {
    return await Hotel.find({ [key]: { $regex: name, $options: "i" }, isActive: true });
};

const getHotels = async (name) => {
    try {
        return Promise.all([
            getHotelList("country", name),
            getHotelList("state", name),
            getHotelList("name", name)
        ])
            .then((values) => {
                const results = [];
                const allValues = [...values[0], ...values[1], ...values[2]];
                allValues.forEach(value => results.some(hotel => JSON.stringify(value._id) === JSON.stringify(hotel._id)) ? null : results.push(value))
                return results
            })
            .then(async (results) => {
                const hotels = await Promise.all(results.map(async (hotel) => {
                    const hotelRoom = await HotelRoom.find({ Hotel_id: hotel._id });
                    const roomTypes = await Promise.all(hotelRoom.map(async ({ RoomType_id }) => {
                        return await RoomType.findById(RoomType_id);

                    }));
                    return {...hotel._doc,room:roomTypes};
                }));
                return hotels;
            })
            .then((hotels)=>{
                console.log(hotels)
                return hotels
            })
            .catch((error) => {
                throw Error(error)
            })
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = getHotels;
