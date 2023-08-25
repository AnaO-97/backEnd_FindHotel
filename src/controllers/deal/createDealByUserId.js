const Deal = require("../../models/dealModel");

const createDealByUserId = async (req, res) => {
    try {
        const attributes = {
            User_id     : req.body.User_id,
            Hotel_id    : req.body.Hotel_id, 
            RoomType_id :req.body.RoomType_id,
            checkIn     :req.body.checkIn, 
            checkOut    :req.body.checkOut
        }

        // console.log(req.body);
        // console.log("attibutes", attributes);

        const newDeal = new Deal(attributes);
        const deal    = await newDeal.save();

        if(deal)
            res.status(200).json(deal);
        else
            res.status(400).json({"message": "Deal not created"});

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = createDealByUserId