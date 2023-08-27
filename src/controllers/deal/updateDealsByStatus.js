const Deal = require("../../models/dealModel");

const updateDealsByStatus = (req, res) => {
    try {
        const { dealId } = req.params;
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = updateDealsByStatus;