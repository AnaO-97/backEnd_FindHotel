const { Router } = require("express");
const trendingHotelsGet = require("../handlers/trendingHotelsGet");
const trendingHotelPost = require("../handlers/trendingHotelPost");
const trendingStatesGet = require("../handlers/trendingStatesGet");
const trendingStatesPost = require("../handlers/trendingStatesPost");
const validationTrendingStatesPost =require ("../middlewares/validationTrendingStatesPost");
const trendingRoutes = Router();

trendingRoutes.get("/hotels", trendingHotelsGet);
trendingRoutes.post("/hotel", trendingHotelPost);
trendingRoutes.get("/state", trendingStatesGet);
trendingRoutes.post("/state", validationTrendingStatesPost, trendingStatesPost);

module.exports = trendingRoutes;