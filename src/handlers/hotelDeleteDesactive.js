const desactiveHotel = require("../controllers/desactiveHotel.js");

const  hotelDeleteDesactive= async (req, res) => {
    try {
        const { id } = req.params;
        const hotelDesactive = await desactiveHotel(id);

        if(hotelDesactive !== null)
            res.status(200).json(hotelDesactive);
        else
            throw new Error('The hotel with the ID provided cannot be found');

    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelDeleteDesactive;