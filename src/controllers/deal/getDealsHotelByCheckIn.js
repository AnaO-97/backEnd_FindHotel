const { Deal } = require("../../models");

const getDealsHotelByCheckIn = () => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDealsHotelByCheckIn