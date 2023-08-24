const Hotel = require("../../models/hotelModel");

const getHotelList = async (key, name) => {
    return await Hotel.find({ [key]: { $regex: name, $options: "i" }, isActive: true });
};

const getHotels = (name) => {
    try {
        return Promise.all([
            getHotelList("country", name),
            getHotelList("state", name),
            getHotelList("name", name)
        ])
            .then((values) => {
                return values
            })
            .catch((error) => {
                throw Error(error)
            })
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = getHotels;
