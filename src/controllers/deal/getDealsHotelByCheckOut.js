const Deal = require("../../models/dealModel");

const getDealsHotelByCheckOut = () => {
    try {
        
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = getDealsHotelByCheckOut