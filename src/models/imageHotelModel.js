const { Schema, model } = require("mongoose");

const imagesHotelSchema = new Schema({
    // User_id: {
    //     type: Schema.Types.ObjectId, 
    //     ref: 'User',
    //     require: true
    // },
    Hotel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        require: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ImagesHotel = model("ImagesHotel", imagesHotelSchema);
module.exports = ImagesHotel;