const TrendingHotels = require("../../models/trendingHotelsModel");

const postTrendingHotel = async (hotel) => {
    let isInTrend = await TrendingHotels.find({ email: hotel.email });
    if (isInTrend.length) throw new Error("This Hotel si already in Trend!");
    const newTrendHotel = new TrendingHotels(hotel);
    return await newTrendHotel.save();
};

module.exports = postTrendingHotel;