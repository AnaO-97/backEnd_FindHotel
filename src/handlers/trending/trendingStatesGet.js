const { getTrendingStates } = require("../../controllers/trending");

const trendingStateGet = async (req, res) => {
    try {
        const trendingStates = await getTrendingStates();
        res.status(200).json(trendingStates);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = trendingStateGet;