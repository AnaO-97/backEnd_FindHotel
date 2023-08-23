const { Schema, model } = require("mongoose");


const ratingSchema = new Schema({
    Deal_id: {
        type: Schema.Types.ObjectId,
        ref: 'Deal',
        require: true
    },
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    rate_Hotel: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
    },
    rate_FindHotel: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
    },
    comment_Hotel: {
        type: String,
        maxlength: [250, "Maximum characters: 250"]
    },
    comment_FindHotel: {
        type: String,
        maxlength: [250, "Maximum characters: 250"]
    }

}, { timestamps: true });

const Rating = model("Rating", ratingSchema);
module.exports = Rating;