const Hotel = require("../../models/hotelModel");
const HotelRoom = require("../../models/hotelRoomModel");
const RoomType = require("../../models/roomTypeModel");

const getHotelDetail = async (id) => {
    const hotelFound = await Hotel.findById(id);
    // if (hotelFound) return hotelFound;
    // throw new Error("No results");
        const hotelRoom = await HotelRoom.find({ Hotel_id: hotelFound._id });
        const roomTypes = await Promise.all(hotelRoom.map(async ({ RoomType_id }) => {
            return await RoomType.findById(RoomType_id);
        
    }));
    return { ...hotelFound._doc, room: roomTypes };


};

module.exports = getHotelDetail;