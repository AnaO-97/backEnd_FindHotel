const controller = {};

controller.createHotelRoom      = require("./createHotelRoom");
controller.getHotelRoomByUserId = require("./getHotelRoomByUserId");
controller.getHotelRoomByHotelId= require("./getHotelRoomByHotelId");

module.exports = controller;