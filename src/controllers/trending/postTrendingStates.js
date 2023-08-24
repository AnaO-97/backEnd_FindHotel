const TrendingState = require("../../models/trendingStatesModel.js");

const postTrendingStates = async (attributes) => {
    const newTrendingState = new TrendingState(attributes);
    return await newTrendingState.save();
};

module.exports = postTrendingStates;