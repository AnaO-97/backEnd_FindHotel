const Hotel = require("../../models/hotelModel");

const desactiveHotel = async (id) => {
    const hotelDesactive = await Hotel.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    )

    return hotelDesactive;
};

module.exports = desactiveHotel;