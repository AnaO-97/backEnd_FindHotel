const { Router } = require('express');
const countriesGet = require("../handlers/countriesGet.js");
const stateGet = require("../handlers/user/stateGet.js");

const destinationRoutes = Router();

destinationRoutes.get("/", countriesGet);
destinationRoutes.get("/states/:country", stateGet);


module.exports = destinationRoutes;