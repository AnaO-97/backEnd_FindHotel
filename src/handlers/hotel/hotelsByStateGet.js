const { getHotelsByCity } = require("../../controllers/hotel");

const hotelsByStateGet = async (req, res) => {
    try {
        const { state } = req.params;
        const hotelsFound = await getHotelsByCity(state);
        res.status(200).json(hotelsFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelsByStateGet;