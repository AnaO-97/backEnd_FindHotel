const Deal = require("../../models/dealModel");

const getDealsHotelByCheckIn = () => {
    try {
        
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = getDealsHotelByCheckIn