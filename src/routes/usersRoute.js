const { Router } = require("express");
const User = require("../models/userModel");


const userRouter = Router();

userRouter.post("/user", (req, res) => {
    console.log("entreeeeeee");
    const { name } = req.body;

    const createUser = new User({ name });
    createUser.save()
        .then(() => res.status(200).json({ message: "Creado!!" }))
        .catch((error) => res.status(400).json({ message: error }))
})

module.exports = userRouter;