const { Schema, model } = require("mongoose");


const hotelRoomSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    Hotel_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hotel',
        require: true
    },
    RoomType_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'RoomType',
        require: true
    },
    date: {
        type: Date,
    }
}, { timestamps: true });

const HotelRoom = model("HotelRoom", hotelRoomSchema);
module.exports = HotelRoom; 