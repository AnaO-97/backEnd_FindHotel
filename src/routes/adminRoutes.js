const { Router } = require('express');
const control    = require("../controllers/superAdmin/index");

const adminRoutes = Router();

adminRoutes.get("/allHotels", control.getAllhotels);
adminRoutes.get("/allUsers",  control.getAllUsers);
adminRoutes.put("/userUpdated/", control.userUpdate);
adminRoutes.put("/hotelDesactive/:id", control.desactiveHotel);
adminRoutes.delete("/hotelDelete/:id", control.deletHotel);


module.exports = adminRoutes;