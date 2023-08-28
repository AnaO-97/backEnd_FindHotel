const deleteHotel = require('./deleteHotel');
const desactiveHotel = require('./desactiveHotel');
const getHotelByName = require('./getHotelByName');
const getHotelDetail = require('./getHotelDetail');
const getHotels = require('./getHotels');
const getHotelsByCountry = require('./getHotelsByCountry');
const getHotelsByDestination = require('./getHotelsByDestination');
const getHotelsByState = require('./getHotelsByState');
const putHotels = require('./putHotels');
const hotelCreate = require('./hotelCreate');

module.exports = {
    deleteHotel,
    desactiveHotel,
    getHotelByName,
    getHotelDetail,
    getHotels,
    getHotelsByCountry,
    getHotelsByDestination,
    getHotelsByState,
    putHotels,
    hotelCreate
}
