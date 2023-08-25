const HotelRoom = require("../../models/hotelModel");

const createHotelRoom = async (req, res) => {
    try {
        const { User_id, Hotel_id, roomType_id } = req.body;
        const newHotelRoom = await HotelRoom(User_id, Hotel_id, roomType_id);
        const hotelRoom = newHotelRoom.save();

        if (hotelRoom) return res.status(200).json(hotelRoom);

    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = createHotelRoom;