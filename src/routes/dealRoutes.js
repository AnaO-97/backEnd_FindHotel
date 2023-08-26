const { Router } = require('express');
const validateDealPost = require('../middlewares/validateDealPost');
const {
    getDealById,
    createDealByUserId,
    getActiveDealsUserById,
    getCanceledDealUserById,
    getDealsHotelByCheckIn,
    getDealsHotelByCheckOut,
    getDealsHotelByHotelId,
    getDealsRoomByRoomId,
    getDealsUserByUserId,

    updateDealsByStatus } = require('../controllers/deal')

const dealRoutes = Router();

dealRoutes.get('/:dealId', getDealById);
// dealRoutes.post('/', createDealByUserId);
dealRoutes.post('/', validateDealPost, createDealByUserId);

module.exports = dealRoutes;