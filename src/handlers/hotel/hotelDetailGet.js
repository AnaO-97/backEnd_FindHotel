const { getHotelDetail } = require("../../controllers/hotel");

const hotelDetailGet = async (req, res) => {
    try {
        const { id } = req.query;
        const hotelFound = await getHotelDetail(id);
        res.status(200).json(hotelFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelDetailGet;