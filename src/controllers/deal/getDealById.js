const { Deal } = require("../../models");

const getDealById = async (req, res) => {
    try {
        const { dealId } = req.params;
        const deal = await Deal.findById({_id: dealId});

        if(deal)
            res.status(200).json(deal);
        else
            res.status(400).json({"message": "Deal not found"});

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = getDealById