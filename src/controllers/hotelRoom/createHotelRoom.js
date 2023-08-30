const { Hotel, HotelRoom } = require("../../models/index");

const createHotelRoom = async (req, res) => {
    try {        
        const atts = {
            User_id   : req.body.User_id, 
            Hotel_id  : req.body.Hotel_id, 
            RoomType_id : req.body.RoomType_id,
        }

        const newHotelRoom = new HotelRoom(atts);

        const hotelRoom = await newHotelRoom.save();
                
        if (hotelRoom) {
            const hotelBefore  = await (Hotel.findById(atts.Hotel_id));
            hotelBefore.room   = [ ...hotelBefore.room, atts.RoomType_id ]
            const hotelUpdated = await hotelBefore.save();
            
            console.log("hotelBefore",hotelBefore)
            
            if(hotelUpdated)
                res.status(200).json(hotelUpdated);
            else{
                HotelRoom.findByIdAndDelete(hotelRoom._id)
                res.status(400).json({ "error": "Hotel not updated" });
            } 
        }
        else
            res.status(400).json({ "error": "HotelRomm not created" });

    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = createHotelRoom;