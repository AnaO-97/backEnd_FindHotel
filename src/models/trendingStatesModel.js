const { Schema, model } = require('mongoose');

const trendingStateSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
})
const TrendingState = model('TrendingState', trendingStateSchema)
module.exports = TrendingState;