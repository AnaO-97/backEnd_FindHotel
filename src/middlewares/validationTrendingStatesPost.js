const TrendingState=require('../models/trendingStatesModel')

const validationTrendingStatesPost = async (req, res, next) => {
    try {
        const {country, state}=req.body
        if(await TrendingState.findOne({ country, state }) ) next()
        throw new Error('This state already exists')
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = validationTrendingStatesPost;