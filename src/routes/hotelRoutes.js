const { Router } = require('express');
const hotelPost = require("../handlers/hotelPost.js")
const hotelGet = require("../handlers/hotelGet.js")
const hotelDelete = require("../handlers/hotelDelete.js")
const hotelPut = require("../handlers/hotelPut.js");
const hotelsByCountryGet = require('../handlers/hotelsByCountryGet.js');
const hotelsByCityGet = require('../handlers/hotelsByCityGet.js');
const hotelByNameGet = require('../handlers/hotelByNameGet.js');

const hotelRoutes = Router();

hotelRoutes.post("/", hotelPost);
hotelRoutes.get("/byCountry", hotelsByCountryGet);
hotelRoutes.get("/byCity", hotelsByCityGet);
hotelRoutes.get("/name/:name", hotelByNameGet);
// hotelRoutes.get("/", hotelGet);
// hotelRoutes.delete("/", hotelDelete);
// hotelRoutes.put("/", hotelPut);

module.exports = hotelRoutes;