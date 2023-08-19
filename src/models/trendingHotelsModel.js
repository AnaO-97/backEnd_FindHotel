const { Schema, model } = require("mongoose");

const trendingHotelsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

const TrendingHotels = model("TrendingHotels", trendingHotelsSchema);
module.exports = TrendingHotels;