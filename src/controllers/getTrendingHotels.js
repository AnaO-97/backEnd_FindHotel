const TrendingHotels = require("../models/trendingHotelsModel");

const getTrendigHotels = async () => {
    const trendingHotels = await TrendingHotels.find();
    if (trendingHotels.length) return trendingHotels;
    throw new Error("No results.");
};

module.exports = getTrendigHotels;