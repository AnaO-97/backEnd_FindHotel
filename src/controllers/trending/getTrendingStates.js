const TrendingState = require("../../models/trendingStatesModel");

const getTrendingStates = async () => {
    const trendingStates = await TrendingState.find();
    if (trendingStates.length) return trendingStates
    throw new Error("No results.")
};

module.exports = getTrendingStates;