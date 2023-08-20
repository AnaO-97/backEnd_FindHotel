const { Schema, model } = require("mongoose");

const imagesHotelSchema = new Schema({
    Hotel_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hotel',
        require: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    }
}, { timestamps: true });

const ImagesHotel = model("ImagesHotel", imagesHotelSchema);
module.exports = ImagesHotel;