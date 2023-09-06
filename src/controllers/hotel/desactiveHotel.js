const Hotel = require("../../models/hotelModel");

const desactiveHotel = async (id) => {
    const hotelDesactive = await Hotel.findByIdAndUpdate(
        id,
        { isActive: !this.isActive },
        { new: true }
    )



    return hotelDesactive;
};

module.exports = desactiveHotel;