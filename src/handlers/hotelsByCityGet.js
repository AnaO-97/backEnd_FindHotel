const { getHotelsByCity } = require("../controllers/hotel");

const hotelsByCityGet = async (req, res) => {
    try {
        const { city } = req.body;
        const hotelsFound = await getHotelsByCity(city);
        res.status(200).json(hotelsFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelsByCityGet;