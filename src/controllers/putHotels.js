const Hotel = require("../models/hotelModel");

const putHotels = async (attributes) => {
    const updateHotel = await Hotel.findByIdAndUpdate(
        attributes._id,
        attributes,
        { new: true },
    );
    return updateHotel
};

module.exports = putHotels;