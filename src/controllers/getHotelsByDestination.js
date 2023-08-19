const Hotel = require("../models/hotelModel");

const getHotelsByDestination = async (data) => {
    const allHotels = await Hotel.find({
        $or: [
            { country: { $regex: data, $options: "i" } },
            { state: { $regex: data, $options: "i" } }
        ],
    });
    if (allHotels.length) return allHotels;
    throw new Error("There is not hotels.");
};

module.exports = getHotelsByDestination;