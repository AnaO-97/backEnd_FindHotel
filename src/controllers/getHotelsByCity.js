const Hotel = require("../models/hotelModel");

const getHotelsByCity = async (city) => {
    const hotelsFound = await Hotel.find({ city: city });
    if (hotelsFound.length) {
        return hotelsFound;
    } else {
        throw new Error("No results.");
    };
};

module.exports = getHotelsByCity;