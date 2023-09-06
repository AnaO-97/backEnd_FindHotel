const controller = {};

controller.createHotelRoom = require("./createHotelRoom");
controller.getHotelRoomByUserId = require("./getHotelRoomByUserId");
controller.getHotelRoomByHotelId = require("./getHotelRoomByHotelId");
controller.getHotelAvailableForBooking = require('./getHotelAvailableForBooking.js')


module.exports = controller;