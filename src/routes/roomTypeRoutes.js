const { Router }= require('express');
const control   = require("../controllers/roomType/index");

const roomTypeRoutes = Router();

roomTypeRoutes.put("/:roomTypeId", control.updateRoomTypeById);
roomTypeRoutes.post("/:userId", control.createRoomTypeByUserId);
roomTypeRoutes.get("/:userId",  control.getRoomTypesByUserId);
roomTypeRoutes.get("/:hotelId", control.getRoomTypesByHotelId);


module.exports = roomTypeRoutes;