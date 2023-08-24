const Hotel = require("../../models/hotelModel");

const getHotelDetail = async (id) => {
    const hotelFound = await Hotel.findById(id);
    if (hotelFound) return hotelFound;
    throw new Error("No results");
};

module.exports = getHotelDetail;