const { putHotels } = require("../../controllers/hotel");

const hotelPut = async (req, res) => {
    try {
        const attributes = req.body;
        const hotelsUpdate = await putHotels(attributes);
        res.status(200).json(hotelsUpdate);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelPut;