const getDealById = require('./getDealById')

//-------------------- Deal by Hotel -------------------------
const getDealsByHotelId = require('./getDealsByHotelId')
const getDealsFilterByHotelId = require('./getDealsFilterByHotelId')

//-------------------- Deal by User -------------------------
const getDealsByUserId = require('./getDealsByUserId')

//-------------------- Deal by Room -------------------------
const getDealsRoomByRoomId = require('./getDealsRoomByRoomId')

//-------------------- Deal'S METHOS -------------------------
const updateDealsById = require('./updateDealsById');
const createDealByUserId = require('./createDealByUserId');


module.exports = {
    getDealById,

    getDealsByHotelId,
    getDealsFilterByHotelId,

    getDealsRoomByRoomId,
    getDealsByUserId,

    createDealByUserId,
    updateDealsById
}