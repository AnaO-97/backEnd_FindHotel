const getHotelByName = require("../controllers/getHotelByName");

const hotelByNameGet = async (req, res) => {
    try {
        const { name } = req.params;
        const hotelFound = await getHotelByName(name);
        res.status(200).json(hotelFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelByNameGet;