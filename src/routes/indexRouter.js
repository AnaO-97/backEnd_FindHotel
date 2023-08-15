const { Router } = require("express");
const userRoutes = require("./userRoutes");
const hotelRoutes = require("./hotelRoutes");
const adminRoutes = require("./adminRoutes.js")


const indexRouter = Router();
indexRouter.use("/user", userRoutes);
// indexRouter.use("/hotel")
// indexRouter.use("/admin")


module.exports = indexRouter;