const { RoomType, User } = require("../../models");
const mongoose = require('mongoose');

const createRoomTypeByUserId = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
            const user = await User.findById(req.params.userId)

            if (user) {
                const attributes = {
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    busy : req.body.busy,
                    free : req.body.free,
                    User_id: req.params.userId,
                    services : req.body.services,
                    isActive : true,
                }

                // console.log(req.body);
                // console.log("attibutes", attributes);

                const newRoomType = new RoomType(attributes);
                const roomType = await newRoomType.save();

                if (roomType)
                    res.status(200).json(roomType);
                else
                    res.status(400).json({ "error": "RoomType not created" });
            }
            else {
                res.status(404).json({ "error": "User not found with provided ID, please check it" })
            }
        }
        else {
            res.status(404).json({ "error": "The provided --- :userId --- is not valid for mongoose ID's" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createRoomTypeByUserId