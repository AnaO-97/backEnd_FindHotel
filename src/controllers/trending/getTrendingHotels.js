const TrendingHotels = require("../../models/trendingHotelsModel");

const getTrendingHotels = async () => {
    const trendingHotels = await TrendingHotels.find();
    if (trendingHotels.length) return trendingHotels;
    throw new Error("No results.");
};

module.exports = getTrendingHotels;