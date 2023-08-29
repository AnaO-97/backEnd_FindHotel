const { Router }= require('express');
const control   = require("../controllers/roomType/index");

const roomTypeRoutes = Router();

roomTypeRoutes.put("/:roomTypeId", control.updateRoomTypeById); //{ "services" : "add jacuzzi" }
roomTypeRoutes.post("/:userId", control.createRoomTypeByUserId);
roomTypeRoutes.get("/user/:userId",  control.getRoomTypesByUserId);
roomTypeRoutes.get("/hotel/:hotelId", control.getRoomTypesByHotelId);


module.exports = roomTypeRoutes;