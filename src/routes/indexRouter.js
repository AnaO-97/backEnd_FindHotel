const { Router } = require("express");
const userRoutes = require("./userRoutes");
const bulkRoutes = require("./bulkRoutes.js");
const hotelRoutes = require("./hotelRoutes");
const adminRoutes = require("./adminRoutes.js");
const destinationRoutes = require("./destinationRoutes.js");
const trendingRoutes = require("./trendingRoutes");
const paymentRoutes = require("./paymentRoutes.js");
const hotelRoomRoutes = require("./hotelRoomRoutes");

const indexRouter = Router();

indexRouter.use("/user", userRoutes);
indexRouter.use("/hotel", hotelRoutes);
indexRouter.use("/destination", destinationRoutes);
indexRouter.use("/trending", trendingRoutes);
indexRouter.use("/payment", paymentRoutes);
indexRouter.use("/hotel-room", hotelRoomRoutes);
// indexRouter.use("/admin")
indexRouter.use("/bulk", bulkRoutes);


module.exports = indexRouter;