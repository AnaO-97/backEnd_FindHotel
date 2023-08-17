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
        type: String,
        required: true,
    },
    image: {
        type: String,
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
    roomTypes: {
        type: String,
        required: true,
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
        default: false
    },
}, {
    timestamps: true
});

const Hotel = mongoose.model('hotel', hotelSchema);
module.exports = Hotel;