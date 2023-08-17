const { Router } = require('express');
const hotelPost = require("../handlers/hotelPost.js")
const hotelGet = require("../handlers/hotelGet.js")
const hotelDelete = require("../handlers/hotelDelete.js")
const hotelPut = require("../handlers/hotelPut.js")

const hotelRoutes = Router();

hotelRoutes.post("/", hotelPost);
// hotelRoutes.get("/", hotelGet);
// hotelRoutes.delete("/", hotelDelete);
// hotelRoutes.put("/", hotelPut);

module.exports = hotelRoutes;