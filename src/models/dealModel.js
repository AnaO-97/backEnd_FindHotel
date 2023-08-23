const { Schema, model } = require("mongoose");


const dealSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Hotel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    RoomType_id: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },
    deal: {
        type: String,
        enum: ["booking", "purchase", "cancelled"],
        required: true
    },
    date: {
        type: Date,
    }
}, { timestamps: true });

const Deal = model("Deal", dealSchema);
module.exports = Deal; 