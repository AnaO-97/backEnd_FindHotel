const { Schema, model } = require("mongoose");


const roomTypeSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    Hotel_id: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    roomServices: [{
        type: String,
        enum: ["no services", "jacuzzi", "room service", "fridge", "bar", "heater", "air-conditioning"],
        default: ["no services"],
    }],
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const RoomType = model("RoomType", roomTypeSchema)
module.exports = RoomType;