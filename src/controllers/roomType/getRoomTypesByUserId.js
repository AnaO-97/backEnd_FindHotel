const { RoomType, User } = require("../../models/index");
const mongoose = require("mongoose");

const getRoomTypesById = async (id) => {
    const roomTypesFound = await RoomType.aggregate([
        { $match: { User_id: new mongoose.Types.ObjectId(id) } },
        //--------------------**User**--------------------
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'User_id',
        //         foreignField: '_id',
        //         as: 'user',
        //     },
        // },
        // {
        //     $unwind: '$user',
        // },
        //--------------------**project**--------------------
        {
            $project: {
                'name': 1,
                'price': 1,
                'stock': 1,
                'isActive': 1,
                'services': 1,

                // 'user._id'  : 1,
                // 'user.role' : 1,
                // 'user.email': 1,
                // 'user.firstName' : 1,
                // 'user.lastName' : 1,
            }
        },
    ]);

    return roomTypesFound;
};

const getRoomTypesByUserId = async (req, res) => {
    try {
        const id = req.params.userId;

        if (mongoose.isValidObjectId(id)) {
            const user = await User.findById(id);

            if (user) {
                const roomTypesFound = await getRoomTypesById(id);

                if (roomTypesFound.length > 0)
                    res.status(200).json(roomTypesFound);
                else
                    res.status(202).json({
                        // "User" : ${user.firtsName} + ${user.lastName},
                        "User": user.email,
                        "id  ": id,
                        "message": "There are no RoomTypes"
                    });
            }
            else {
                res.status(404).json({ "error": "Not User with the provided ID, please check it" })
            }
        }
        else {
            res.status(404).json({ "error": "The provided --> id <-- is not valid for mongoose ID's" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getRoomTypesByUserId;