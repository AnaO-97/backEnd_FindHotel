const getHotelsByCity = require("../controllers/getHotelsByState");

const hotelsByStateGet = async (req, res) => {
    try {
        const { city } = req.params;
        const hotelsFound = await getHotelsByCity(city);
        res.status(200).json(hotelsFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelsByStateGet;