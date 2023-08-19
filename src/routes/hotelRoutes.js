const { Router } = require('express');
const hotelPost = require("../handlers/hotelPost.js")
const hotelGet = require("../handlers/hotelGet.js")
const hotelDelete = require("../handlers/hotelDelete.js")
<<<<<<< HEAD
const hotelPut = require("../handlers/hotelPut.js");
const hotelsByCountryGet = require('../handlers/hotelsByCountryGet.js');
const hotelsByStateGet = require('../handlers/hotelsByStateGet.js');
const hotelByNameGet = require('../handlers/hotelByNameGet.js');
=======
const hotelPut = require("../handlers/hotelPut.js")
>>>>>>> 739b31c69421773d55e77ad8cd3d41ddf6ded370

const hotelRoutes = Router();

hotelRoutes.post("/", hotelPost);
hotelRoutes.get("/byCountry/:country", hotelsByCountryGet);
hotelRoutes.get("/byState/:state", hotelsByStateGet);
hotelRoutes.get("/name/:name", hotelByNameGet);
// hotelRoutes.get("/", hotelGet);
// hotelRoutes.delete("/", hotelDelete);
// hotelRoutes.put("/", hotelPut);

module.exports = hotelRoutes;