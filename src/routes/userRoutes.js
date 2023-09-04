const { Router } = require('express');
const { validationResult } = require('express-validator');

const validationUserPost = require("../middlewares/validationUserPost")
const userPost = require("../handlers/user/userPost.js");
const userGet = require("../handlers/user/userGet.js");
const userGetID = require("../handlers/user/userGetID.js");
const userDelete = require("../handlers/user/userDelete.js");
const userPut = require("../handlers/user/userPut.js");

const userRoutes = Router();


userRoutes.post("/", validationUserPost, userPost);
userRoutes.get("/users", userGet);
userRoutes.delete("/", userDelete);
//userRoutes.get("/:id", userGetID);
// userRoutes.put("/", userPut);

const {
    userAuthActiveAccount,
    userAuthSignIn,
    userAuthSignOut,
    userAuthSignUp,
    userAuthVerifyEmail,
    userAuthVerifySession,
    userAuthUpdateSession
} = require('../controllers/user')
const { userSignUp, userActivate } = require('../middlewares/validateUser.js');

userRoutes.post("/auth/sign-in", userAuthSignIn)
userRoutes.delete("/auth/sign-out", userAuthSignOut)
userRoutes.get("/auth/session", userAuthVerifySession)
userRoutes.put("/auth/session", userAuthUpdateSession)
userRoutes.post("/auth/verify-email/:email", userAuthVerifyEmail)

userRoutes.post("/auth/sign-up", userSignUp, (req, res, next) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
},
    (req, res) => {
        userAuthSignUp(req, res);
    }
)

userRoutes.get("/auth/:userActive", userActivate, (req, res, next) => {
    console.log(req.params)
    const errors = validationResult(req.params);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
},
    (req, res) => {
        userAuthActiveAccount(req, res);
    });



module.exports = userRoutes;