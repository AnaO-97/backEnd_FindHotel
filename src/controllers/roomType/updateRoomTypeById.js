const { RoomType } = require("../../models/index");

// {
    // 	"name"  : "",
    // 	"price" : "", 
    // 	"stock" : "",
    //  "isActive" : true/false
    // 	"User_id"  : "",
    // 	"roomServices" : ["no services", "jacuzzi", "room service", "fridge", "bar", "heater", "air-conditioning"],
// }

const updateRoomTypeById = async (req, res) => {
    try {
        const put = req.body;
        const attributes = Object.entries(put);
        const { roomTypeId } = req.params;

        const roomTypeBefore = await (RoomType.findById(roomTypeId));

        attributes.forEach(att => {  
            roomTypeBefore[att[0]] = att[1];
        });
        const roomTypeUpdated = await roomTypeBefore.save();

        if (roomTypeUpdated)
            res.status(200).json(roomTypeUpdated)
        else
            res.status(400).json({ "message": "The roomType was not found with the supplied ID, please check it" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = updateRoomTypeById;