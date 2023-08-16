const Hotel = require("../models/hotelModel");

const hotelCreate = async (attributes) => {
    const newHotel = new Hotel(attributes);
    return await newHotel.save();
};

module.exports = hotelCreate;