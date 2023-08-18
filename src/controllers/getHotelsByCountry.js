const Hotel = require("../models/hotelModel");

const getHotelsByCountry = async (country) => {
    const hotelsFound = await Hotel.find({ country: country });
    if (hotelsFound.length) {
        return hotelsFound;
    } else {
        throw new Error("No results.");
    };
};

module.exports = getHotelsByCountry;