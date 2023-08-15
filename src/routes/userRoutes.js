const { Router } = require('express');
const userPost = require("../handlers/userPost")
const userGet = require("../handlers/userGet.js")
const userDelete = require("../handlers/userDelete.js")
const userPut = require("../handlers/userPut.js")

const userRoutes = Router();

userRoutes.post("/", userPost);
// userRoutes.get("/", userGet);
// userRoutes.delete("/", userDelete);
// userRoutes.put("/", userPut);

module.exports = userRoutes;