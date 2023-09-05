const { Router } = require('express');
const hotelPost = require("../handlers/hotel/hotelPost.js");
const hotelGet = require("../handlers/hotel/hotelGet.js");
const hotelDelete = require("../handlers/hotel/hotelDelete.js");
const hotelDeleteDesactive = require("../handlers/hotel/hotelDeleteDesactive.js");
const hotelPut = require("../handlers/hotel/hotelPut.js");
const hotelsByCountryGet = require('../handlers/hotel/hotelsByCountryGet.js');
const hotelsByStateGet = require('../handlers/hotel/hotelsByStateGet.js');
const hotelByNameGet = require('../handlers/hotel/hotelByNameGet.js');
const hotelDetailGet = require('../handlers/hotel/hotelDetailGet.js');
const getHotelAvailableForBooking = require('../controllers/hotel/getHotelAvailableForBooking.js')

const hotelRoutes = Router();


hotelRoutes.post("/", hotelPost);
hotelRoutes.get("/", hotelGet);
hotelRoutes.get("/detail", hotelDetailGet);
// hotelRoutes.get("/byCountry/:country", hotelsByCountryGet);
// hotelRoutes.get("/byState/:state", hotelsByStateGet);
// hotelRoutes.get("/name/:name", hotelByNameGet);
hotelRoutes.delete("/desactive/:id", hotelDeleteDesactive);
hotelRoutes.delete("/:id", hotelDelete);
hotelRoutes.put("/", hotelPut);

hotelRoutes.get('/:search', getHotelAvailableForBooking)
module.exports = hotelRoutes;