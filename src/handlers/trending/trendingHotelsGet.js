const { getTrendingHotels } = require("../../controllers/trending");

const trendingHotelsGet = async (req, res) => {
    try {
        const trendingResults = await getTrendingHotels();
        res.status(200).json(trendingResults);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = trendingHotelsGet;