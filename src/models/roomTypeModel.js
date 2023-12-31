const { Schema, model } = require("mongoose");


const roomTypeSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    services: [{
        type: String,
        enum: ["no services", "jacuzzi", "room service", "fridge", "bar", "heater", "air-conditioning"],
        default: ["no services"],
    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0, 
    },
    busy: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    free: {
        type: Number,
        required: true,
        min: 0,
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

roomTypeSchema.post("save", function () {
    this.free = this.stock - this.busy;
    this.save();
});

const RoomType = model("RoomType", roomTypeSchema)
module.exports = RoomType;