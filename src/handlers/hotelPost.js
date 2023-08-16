const hotelCreate = require("../controllers/hotelCreate");

const hotelPost = async (req, res) => {
    try {
        const attributes = req.body;
        const newHotel = await hotelCreate(attributes);
        res.status(200).json(newHotel);
    } catch (error) {
        res.status(404).json({ message: error });
    };
};

module.exports = hotelPost;