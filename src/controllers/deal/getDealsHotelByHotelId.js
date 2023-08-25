const Deal = require("../../models/dealModel");

const getDealsHotelByHotelId = () => {
    try {
        
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = getDealsHotelByHotelId