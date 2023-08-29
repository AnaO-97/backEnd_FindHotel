const { HotelRoom } = require("../../models/index");

const createHotelRoom = async (req, res) => {
    try {        
        const atts = {
            User_id   : req.body.User_id, 
            Hotel_id  : req.body.Hotel_id, 
            RoomType_id : req.body.RoomType_id,
        }

        const newHotelRoom = new HotelRoom(atts);
        const hotelRooms = await newHotelRoom.save();

        if (hotelRooms) 
            res.status(200).json(hotelRooms);
        else
            res.status(400).json({ "error": "HotelRomm not created" });

    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = createHotelRoom;