const { postTrendingStates } = require("../../controllers/trending");

const trendingStatesPost = async (req, res) => {
    try {
        const attributes = req.body;
        const trendingStates = await postTrendingStates(attributes)
        res.status(200).json(trendingStates);
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = trendingStatesPost;