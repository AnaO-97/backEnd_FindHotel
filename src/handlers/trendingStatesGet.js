const getTrendingStates = require("../controllers/getTrendingStates.js")

const trendingStateGet = async (req, res) => {
    try {
        const trendingStates = await getTrendingStates();
        res.status(200).json(trendingStates);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = trendingStateGet;