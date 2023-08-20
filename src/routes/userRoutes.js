const { Router } = require('express');
const { validationResult } = require('express-validator');

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



const userAuthSignUp = require('../controllers/userAuthSignUp.js');
const userAuthActiveAccount = require('../controllers/userAuthActiveAccount.js');
const { userSignUp, userActivate } = require('../middlewares/validateUser.js')

userRoutes.post("/register", userSignUp, (req, res, next) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
},
    (req, res) => {
        userAuthSignUp(req, res)
    })

userRoutes.get("/active/:userActive", userActivate, userActivate, (req, res, next) => {
    const errors = validationResult(req.params);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
},
    (req, res) => {
        userAuthActiveAccount(req, res);
    });

module.exports = userRoutes;