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
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^((?!^[._%+-])(?![._%+-]{2,})[a-zñ0-9._%+-]){5,29}[a-zñ0-9]+@(([\w-]+)+\.+[\w-]{2,4})$/.test(value);
            },
            message: ({ value }) => `${value} it is not a valid mail.`
        }
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