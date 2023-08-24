const { postTrendingHotel } = require("../../controllers/trending");

const trendingHotelPost = async (req, res) => {
    try {
        const hotelToTrend = req.body;
        const newTrendHotel = await postTrendingHotel(hotelToTrend);
        res.status(200).json(newTrendHotel);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = trendingHotelPost;