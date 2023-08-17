const { Schema, model } = require("mongoose");


const ratingSchema = new Schema({
    Deal_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Deal',
        require: true
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    comment: {
        type: String,
        maxlength: [250, "Maximum characters: 250"]
    }

}, { timestamps: true });

const Rating = model("Rating", ratingSchema);
module.exports = Rating;