const { Router } = require("express");
const { createHotelRoom } = require("../controllers/hotelRoom");
const validateCreateHotelRoom = require("../middlewares/validateHotelRoom");

const hotelRoomRoutes = Router();

hotelRoomRoutes.post("/", validateCreateHotelRoom, createHotelRoom);


module.exports = hotelRoomRoutes;