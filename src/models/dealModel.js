const { Schema, model } = require("mongoose");


const dealSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    Hotel_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hotel',
        require: true
    },
    RoomType_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'RoomType',
        require: true
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