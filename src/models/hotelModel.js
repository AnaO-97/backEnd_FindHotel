const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Hotel already exist"]
    },
    prices: {
        minprice: {
            type: Number,
            required: true,

        }, maxprice: {
            type: Number,
            required: true,
        },
    },
    category: {
        type: Number,
        required: true,
    },
    services: {
        type: String, //array de strings
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    roomTypes: {
        type: String,//array?
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    roomService: {
        type: Boolean,
        default: false,
    },
    wifi: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const Hotel = mongoose.model('hotel', hotelSchema);
module.exports = Hotel;