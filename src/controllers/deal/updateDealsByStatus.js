const Deal = require("../../models/dealModel");

const updateDealsByStatus = (req, res) => {
    try {
        
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = updateDealsByStatus;