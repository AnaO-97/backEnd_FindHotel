const { Deal } = require("../../models");

const getDealsHotelByCheckOut = () => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDealsHotelByCheckOut