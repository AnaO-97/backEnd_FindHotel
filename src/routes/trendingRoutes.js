const { Router } = require("express");
const trendingHotelsGet = require("../handlers/trending/trendingHotelsGet");
const trendingHotelPost = require("../handlers/trending/trendingHotelPost");
const trendingStatesGet = require("../handlers/trending/trendingStatesGet");
const trendingStatesPost = require("../handlers/trending/trendingStatesPost");
const validationTrendingStatesPost = require("../middlewares/validationTrendingStatesPost");
const trendingRoutes = Router();

trendingRoutes.get("/hotels", trendingHotelsGet);
trendingRoutes.post("/hotel", trendingHotelPost);
trendingRoutes.get("/state", trendingStatesGet);
trendingRoutes.post("/state", trendingStatesPost);

module.exports = trendingRoutes;