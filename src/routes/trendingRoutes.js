const { Router } = require("express");
const trendingHotelsGet = require("../handlers/trendingHotelsGet");
const trendingHotelPost = require("../handlers/trendingHotelPost");

const trendingRoutes = Router();

trendingRoutes.get("/hotels", trendingHotelsGet);
trendingRoutes.post("/hotel", trendingHotelPost);

module.exports = trendingRoutes;