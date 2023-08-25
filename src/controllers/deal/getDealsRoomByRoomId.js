const Deal = require("../../models/dealModel");

const getDealsRoomByRoomId = () => {
    try {
        
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = getDealsRoomByRoomId;