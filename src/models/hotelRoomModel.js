const { Schema, model } = require("mongoose");


const hotelRoomSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Hotel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    RoomType_id: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    }
}, { timestamps: true });

const HotelRoom = model("HotelRoom", hotelRoomSchema);
module.exports = HotelRoom; 