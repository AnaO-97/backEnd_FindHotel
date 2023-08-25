const getActiveDealsUserById = require('./getActiveDealsUserById')
const getCanceledDealUserById = require('./getCanceledDealUserById')
const getDealById = require('./getDealById')
const getDealsHotelByCheckIn = require('./getDealsHotelByCheckIn')
const getDealsHotelByCheckOut = require('./getDealsHotelByCheckOut')
const getDealsHotelByHotelId = require('./getDealsHotelByHotelId')
const getDealsRoomByRoomId = require('./getDealsRoomByRoomId')
const getDealsUserByUserId = require('./getDealsUserByUserId')
const updateDealsByStatus = require('./updateDealsByStatus')
const createDealByUserId = require('./createDealByUserId');
const updateDealsById = require('./updateDealsById');


module.exports = {
    getActiveDealsUserById,
    getCanceledDealUserById,
    getDealById,
    getDealsHotelByCheckIn,
    getDealsHotelByCheckOut,
    getDealsHotelByHotelId,
    getDealsRoomByRoomId,
    getDealsUserByUserId,
    createDealByUserId,
    updateDealsByStatus,
    updateDealsById
}