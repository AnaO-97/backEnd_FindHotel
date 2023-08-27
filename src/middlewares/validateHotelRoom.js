const { body } = require("express-validator");
const { Hotel, User, RoomType } = require("../models");


const validateHotelRoom = {
    hotel:
        body("Hotel_id")
            .notEmpty().withMessage("The field must not be empty").bail()
            .isMongoId().withMessage("This field must be a Mongo ID").bail()
            .custom(async (Hotel_id) => {
                const isHotelId = await Hotel.findById(Hotel_id);
                if (isHotelId) throw new Error("Hotel_id not found.");
            }).bail(),
    user:
        body("User_id")
            .notEmpty().withMessage("The field must not be empty").bail()
            .isMongoId().withMessage("This field must be a Mongo ID").bail()
            .custom(async (User_id) => {
                const isUserId = await User.findById(User_id);
                if (isUserId) throw new Error("User_id not found.");
            }).bail(),
    roomType:
        body("RoomType_id")
            .notEmpty().withMessage("The field must not be empty").bail()
            .isMongoId().withMessage("This field must be a Mongo ID").bail()
            .custom(async (RoomType_id) => {
                const isRoonTypeId = await RoomType.findById(RoomType_id);
                if (isRoonTypeId) throw new Error("RoomType_id not found.");
            }).bail(),
};

const validateCreateHotelRoom = [
    validateHotelRoom.hotel,
    validateHotelRoom.user,
    validateHotelRoom.roomType
];

module.exports = validateCreateHotelRoom;