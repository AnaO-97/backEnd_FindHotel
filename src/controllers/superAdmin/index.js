const control = {};

control.getAllhotels = require("./getAllhotels");
control.getAllUsers  = require("./getAllUsers");
control.userUpdate   = require("../../handlers/user/userPut");
control.deletHotel   = require("../../handlers/hotel/hotelDelete");
control.desactiveHotel  = require("../../handlers/hotel/hotelDesactive");


module.exports = control;