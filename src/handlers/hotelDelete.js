const deleteHotel = require("../controllers/deleteHotel.js");

const  hotelDelete= async (req, res) => {
    try {
        const { id } = req.params;
        const hotelDelete = await deleteHotel(id);

        if(hotelDelete !== null)
            res.status(200).json(hotelDelete);
        else
            throw new Error('The hotel with the ID provided cannot be found');

    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = hotelDelete;