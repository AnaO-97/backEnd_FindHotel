const deleteHotel = require('./deleteHotel');
const desactiveHotel = require('./desactiveHotel');
const getHotelByName = require('./getHotelByName');
const getHotelDetail = require('./getHotelDetail');
const getHotels = require('./getHotels');
const getHotelsByCity = require('./getHotelsByCity');
const getHotelsByCountry = require('./getHotelsByCountry');
const getHotelsByDestination = require('./getHotelsByDestination');
const getHotelsByState = require('./getHotelsByState');
const putHotels = require('./putHotels');

module.exports = {
    deleteHotel,
    desactiveHotel,
    getHotelByName,
    getHotelDetail,
    getHotels,
    getHotelsByCity,
    getHotelsByCountry,
    getHotelsByDestination,
    getHotelsByState,
    putHotels
}