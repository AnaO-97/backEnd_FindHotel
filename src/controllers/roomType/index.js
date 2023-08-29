const control = {};

control.updateRoomTypeById = require('./updateRoomTypeById')
control.getRoomTypesByUserId = require('./getRoomTypesByUserId')
control.getRoomTypesByHotelId = require('./getRoomTypesByHotelId')
control.createRoomTypeByUserId = require('./createRoomTypeByUserId')

module.exports = control;