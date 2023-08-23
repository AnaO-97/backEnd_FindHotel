const { Schema, model } = require("mongoose");

const hotelSchema = new Schema({
    // User_id: {
    //     type: Types.ObjectId, 
    //     ref: 'User',
    //     require: true
    // },
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: Number,
        required: true,
    },
    services: [{
        type: String,
        enum: ['all inclusive', 'breakfast', 'lunch', "dinner", "bar"],
        default: ['no services']
    }],
    // roomTypes: [{
    //     type: String,
    //     enum: ['standard', 'double', 'suite'],
    //     required: true
    // }],
    room: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    roomService: {
        type: Boolean,
    },
    wifi: {
        type: Boolean,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const Hotel = model('hotel', hotelSchema);
module.exports = Hotel;