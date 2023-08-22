const { Router } = require('express');
const hotelPost = require("../handlers/hotelPost.js")
const hotelGet = require("../handlers/hotelGet.js")
const hotelDelete = require("../handlers/hotelDelete.js");
const hotelDeleteDesactive = require("../handlers/hotelDeleteDesactive.js")
const hotelPut = require("../handlers/hotelPut.js");
const hotelsByCountryGet = require('../handlers/hotelsByCountryGet.js');
const hotelsByStateGet = require('../handlers/hotelsByStateGet.js');
const hotelByNameGet = require('../handlers/hotelByNameGet.js');

const hotelRoutes = Router();

hotelRoutes.post("/", hotelPost);
hotelRoutes.get("/",hotelGet);
hotelRoutes.get("/byCountry/:country", hotelsByCountryGet);
hotelRoutes.get("/byState/:state", hotelsByStateGet);
hotelRoutes.get("/name/:name", hotelByNameGet);
// hotelRoutes.get("/", hotelGet);
hotelRoutes.delete("/desactive/:id", hotelDeleteDesactive);
hotelRoutes.delete("/:id", hotelDelete);
// hotelRoutes.put("/", hotelPut);

module.exports = hotelRoutes;