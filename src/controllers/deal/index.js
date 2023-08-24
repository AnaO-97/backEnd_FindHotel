const getActiveDealsUserById = require('./getActiveDealsUserById')
const getCanceledDealUserById = require('./getCanceledDealUserById')
const getDealById = require('./getDealById')
const getDealsHotelByCheckIn = require('./getDealsHotelByCheckIn')
const getDealsHotelByCheckOut = require('./getDealsHotelByCheckOut')
const getDealsHotelById = require('./getDealsHotelById')
const getDealsRoomsById = require('./getDealsRoomsById')
const getDealsUserById = require('./getDealsUserByUserId')
const updateDealsById = require('./updateDealsById')
const updateDealsByStatus = require('./updateDealsByStatus')

module.exports = {
    getActiveDealsUserById,
    getCanceledDealUserById,
    getDealById,
    getDealsHotelByCheckIn,
    getDealsHotelByCheckOut,
    getDealsHotelById,
    getDealsRoomsById,
    getDealsUserById,
    updateDealsById,
    updateDealsByStatus,
}