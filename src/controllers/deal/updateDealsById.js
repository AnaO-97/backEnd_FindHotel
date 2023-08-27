const { Deal } = require("../../models");

// {
// 	"User_id"     : "63e825d14bd146895d387",
// 	"Hotel_id"    : "63e825d14bd146895d387",
// 	"RoomType_id" : "63e825d14bd146895d387",
// 	"status" 	  : "holi", 
// 	"checkIn"     : "2023-05-1"
// }

const updateDealsById = async (req, res) => {
    try {
        const put = req.body;
        const attributes = Object.entries(put);
        const { dealId } = req.params;

        const dealBefore = await (Deal.findById(dealId));

        attributes.forEach(att => {
            dealBefore[att[0]] = att[1];
        });
        const dealUpdated = await dealBefore.save();

        if (dealUpdated)
            res.status(200).json(dealUpdated)
        else
            res.status(400).json({ "message": "The deal was not found with the supplied ID, please check it" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = updateDealsById;