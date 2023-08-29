const { body } = require("express-validator");
const { Hotel, User, RoomType } = require("../models/index");

const validateHotelRoom = {
    hotel:
        body("Hotel_id")
            .notEmpty().withMessage("The field must not be empty").bail()
            .isMongoId().withMessage("This field must be a Mongo ID").bail()
            .custom(async (Hotel_id) => {
                const isHotelId = await Hotel.findById(Hotel_id);
                console.log("isHotelId", !isHotelId);
                if (!isHotelId) {
                    console.log("no existe hotel");
                    throw new Error('Hotel_id not found.');
                }
                console.log("salio del val hotel");
            }),
    user:
        body("User_id")
            .notEmpty().withMessage("The field must not be empty").bail()
            .isMongoId().withMessage("This field must be a Mongo ID").bail()
            .custom(async (User_id) => {
                const isUserId = await User.findById(User_id);
                console.log("isUserId", !isUserId);
                if (!isUserId){
                    console.log("no existe user");
                    throw new Error("User_id not found.");
                }
                console.log("salio del val hotel");
            }),
    roomType:
        body("RoomType_id")
            .notEmpty().withMessage("The field must not be empty").bail()
            .isMongoId().withMessage("This field must be a Mongo ID").bail()
            .custom(async (RoomType_id) => {
                const isRoonTypeId = await RoomType.findById(RoomType_id);
                if (isRoonTypeId === null) throw new Error("RoomType_id not found.");
            }),
};

const validateCreateHotelRoom = [
    validateHotelRoom.hotel,
    validateHotelRoom.user,
    validateHotelRoom.roomType
];

module.exports = validateCreateHotelRoom;