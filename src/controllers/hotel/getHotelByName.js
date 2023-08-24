const Hotel = require("../../models/hotelModel");

const getHotelByName = async (name) => {
    const hotelFound = await Hotel.find({ name: name });
    if (hotelFound.length) return hotelFound;
    throw new Error("Hotel not found.");
};

module.exports = getHotelByName;