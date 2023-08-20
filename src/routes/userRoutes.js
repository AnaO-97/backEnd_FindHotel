const { Router } = require('express');
const validationUserPost = require("../middlewares/validationUserPost")
const userPost = require("../handlers/userPost.js");
// const userGet = require("../handlers/userGet.js");
const userGetID = require("../handlers/userGetID.js");
// const userDelete = require("../handlers/userDelete.js");
const userPut = require("../handlers/userPut.js");

const userRoutes = Router();


userRoutes.post("/", validationUserPost,userPost);
userRoutes.get("/users", userGet);
userRoutes.delete("/", userDelete);
//userRoutes.get("/:id", userGetID);
// userRoutes.put("/", userPut);


module.exports = userRoutes;