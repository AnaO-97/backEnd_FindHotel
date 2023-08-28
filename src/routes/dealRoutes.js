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

// dealRoutes.get('/:dealId', getDealById);

// dealRoutes.put('/:dealId', updateDealsById);
dealRoutes.put('/:dealId', validateDealPut, updateDealsById);

// dealRoutes.post('/', validateDealPost, createDealByUserId);
dealRoutes.post('/', createDealByUserId);

dealRoutes.get('/user/:userId', getDealsByUserId);
dealRoutes.get('/hotel/:hotelId',
    (req, res) => {
        const [[, queryValue]] = Object.entries(req.query);
        // console.log(queryAtt); console.log(queryValue);

        (queryValue !== null && queryValue !== undefined && queryValue !== "")
            ? getDealsFilterByHotelId(req, res)
            : getDealsByHotelId(req, res)
    }
);

module.exports = dealRoutes;