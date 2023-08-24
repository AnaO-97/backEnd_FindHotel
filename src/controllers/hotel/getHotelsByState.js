const Hotel = require("../../models/hotelModel");

const getHotelsByState = async (state) => {
    const hotelsFound = await Hotel.find({ state: state });
    if (hotelsFound.length) return hotelsFound;
    throw new Error("No results.");
};

module.exports = getHotelsByState;