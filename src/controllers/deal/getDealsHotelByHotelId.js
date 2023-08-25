const { Deal } = require("../../models");

const getDealsHotelByHotelId = () => {

    try {

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDealsHotelByHotelId