const { Router } = require('express');
const userPost = require("../handlers/userPost.js");
const userGet = require("../handlers/userGet.js");
const userGetID = require("../handlers/userGetID.js");
const userDelete = require("../handlers/userDelete.js");
const userPut = require("../handlers/userPut.js");

const userRoutes = Router();

userRoutes.post("/", userPost);
// userRoutes.get("/", userGet);
userRoutes.get("/:id", userGetID);
// userRoutes.delete("/", userDelete);
userRoutes.put("/", userPut);

module.exports = userRoutes;