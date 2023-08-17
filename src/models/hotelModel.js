const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Hotel already exist"]
    },
    phone: {
        type: String,
    },
    category: {
        type: Number,
        required: true,
    },
    facilities: [{
        type: String,
        enum: ['beach', 'swimming pool', 'gym', 'parking', 'room service'],
        default: []
    }],
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
    roomServices: [{
        type: String,
        enum: ["no services", "jacuzzi", "room service", "fridge", "bar", "heater", "air-conditioning"],
        required: true
    }],
    ubication: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        }
    },
    isActive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;