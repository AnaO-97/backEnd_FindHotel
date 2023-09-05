const { Router } = require("express");
const { validationResult } = require("express-validator");
const controller = require("../controllers/hotelRoom/index");
const validateCreateHotelRoom = require("../middlewares/validateHotelRoom");


const validationPOST = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};

const hotelRoomRoutes = Router();

hotelRoomRoutes.post("/", validateCreateHotelRoom, validationPOST, controller.createHotelRoom);
hotelRoomRoutes.get("/user/:userId", controller.getHotelRoomByUserId);
hotelRoomRoutes.get("/hotel/:hotelId", controller.getHotelRoomByHotelId);
hotelRoomRoutes.get('/:search', controller.getHotelAvailableForBooking)

module.exports = hotelRoomRoutes;