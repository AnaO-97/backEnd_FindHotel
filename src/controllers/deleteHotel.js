const Hotel = require("../models/hotelModel");

const deleteHotel = async (id) =>{
    const hotelDelete = await Hotel.findOneAndDelete(
        {_id: id },
        {new:true}
    );

    return hotelDelete;
};

module.exports = deleteHotel;