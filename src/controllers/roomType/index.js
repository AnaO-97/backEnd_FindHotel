const control = {};

control.updateRoomTypeById     = require('./updateRoomTypeById')
control.getRoomTypesByUserId   = require('./getRoomTypesByUserId')
control.getRoomTypesByHotelId  = require('./getRoomTypesByHotelId')
control.assignRoomTypeToHotel  = require('./assignRoomTypeToHotel')
control.createRoomTypeByUserId = require('./createRoomTypeByUserId')

module.exports = control;