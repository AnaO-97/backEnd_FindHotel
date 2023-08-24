const { getHotels } = require("../controllers/hotel");

const hotelGet = async (req, res) => {
    try {
        const { name } = req.query;
        const hotelsFound = await getHotels(name);
        res.status(200).json(hotelsFound);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelGet;