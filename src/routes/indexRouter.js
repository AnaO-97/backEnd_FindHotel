const jwt = require('jsonwebtoken');
const { JWT_ROUTES_KEY } = process.env;
const { Router } = require("express");
const dealRoutes = require("./dealRoutes");
const userRoutes = require("./userRoutes");
const bulkRoutes = require("./bulkRoutes.js");
const hotelRoutes = require("./hotelRoutes");
const adminRoutes = require("./adminRoutes.js");
const destinationRoutes = require("./destinationRoutes.js");
const trendingRoutes = require("./trendingRoutes");
const paymentRoutes = require("./paymentRoutes.js");
const validateTokenJWT = require("../middlewares/validateTokenJWT")

const indexRouter = Router();

indexRouter.use("/user", userRoutes);
indexRouter.use("/hotel", hotelRoutes);
indexRouter.use("/destination", destinationRoutes);
indexRouter.use("/trending", trendingRoutes);
indexRouter.use("/payment", paymentRoutes);
// indexRouter.use("/admin")
indexRouter.use("/bulk", bulkRoutes);
indexRouter.use("/deals", dealRoutes)

indexRouter.post(
    "/generarToken", 
    (req, res)=>{
        try {
            const userLogin = {
                name: "Ana",
                correo: "ana@email.com"
            }

            // console.log("JWT_ROUTES_KEY",JWT_ROUTES_KEY);

            jwt.sign({user: userLogin}, "HenryProyectoFinalFindHotel",
                (err, tokenRoutes) => {
                    console.log("error: ", err)
                    console.log("TOKEN: ", tokenRoutes)

                    if (err !== null) {
                        throw new Error (err)
                    }
                    else{
                        res.json({"tokenRoutes": tokenRoutes})
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
    (req, res)=>{
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