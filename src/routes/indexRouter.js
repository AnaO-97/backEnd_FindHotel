const jwt = require('jsonwebtoken');
const { Router } = require("express");
const adminRoutes= require("./adminRoutes");
const dealRoutes = require("./dealRoutes");
const userRoutes = require("./userRoutes");
const bulkRoutes = require("./bulkRoutes.js");
const hotelRoutes = require("./hotelRoutes");
const roomTypeRoutes = require("./roomTypeRoutes");
const destinationRoutes = require("./destinationRoutes.js");
const trendingRoutes = require("./trendingRoutes");
const paymentRoutes = require("./paymentRoutes.js");
const validateTokenJWT = require("../middlewares/validateTokenJWT")
const hotelRoomRoutes = require("./hotelRoomRoutes");

const indexRouter = Router();

indexRouter.use("/user", userRoutes);
indexRouter.use("/hotel", hotelRoutes);
indexRouter.use("/destination", destinationRoutes);
indexRouter.use("/trending", trendingRoutes);
indexRouter.use("/payment", paymentRoutes);
indexRouter.use("/roomType", roomTypeRoutes);
indexRouter.use("/hotelRoom", hotelRoomRoutes);
indexRouter.use("/bulk", bulkRoutes);
indexRouter.use("/deals", dealRoutes)
indexRouter.use("/admin", adminRoutes);

indexRouter.post(
    "/generarToken",
    (req, res) => {
        try {
            const userLogin = {
                name: "Ana",
                correo: "ana@email.com"
            }

            // console.log("JWT_ROUTES_KEY",JWT_ROUTES_KEY);

            jwt.sign({ user: userLogin }, "HenryProyectoFinalFindHotel",
                (err, tokenRoutes) => {
                    console.log("error: ", err)
                    console.log("TOKEN: ", tokenRoutes)

                    if (err !== null) {
                        throw new Error(err)
                    }
                    else {
                        res.json({ "tokenRoutes": tokenRoutes })
                    }
                }
            )
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
);

indexRouter.post(
    "/pruebaToken",
    validateTokenJWT,
    (req, res) => {
        try {
            res.send({
                "Token Validado para el user": "bien",
                "userToken": req.tokenRoutes,
                "user": req.userLogin,
            })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
);


module.exports = indexRouter;