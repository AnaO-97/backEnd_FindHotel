const getHotelsByCountry = require("../controllers/getHotelsByCountry");

const hotelsByCountryGet = async (req, res) => {
    try {
        const { country } = req.body;
        const hotelsFound = await getHotelsByCountry(country);
        res.status(200).json(hotelsFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelsByCountryGet;