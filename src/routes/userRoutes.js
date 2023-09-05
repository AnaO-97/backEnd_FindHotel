const { Router } = require('express');
const { validationResult } = require('express-validator');

const cookie = require('cookie');

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
    userAuthSignUp,
    userAuthSignIn,
    userAuthSignOut,
    userAuthVerifyEmail
} = require('../controllers/user')
const { userSignUp, userActivate } = require('../middlewares/validateUser.js');

userRoutes.post("/auth/cookie", (req, res) => {
    const cookies = req.cookies
    console.log("🚀 ~ file: userRoutes.js:32 ~ userRoutes.post ~ cookie:", cookies)
    const authData = req.session
    console.log("🚀 ~ file: userRoutes.js:33 ~ userRoutes.post ~ authData:", authData)
    const sessionCookie = req.sessionID
    console.log("🚀 ~ file: userRoutes.js:34 ~ userRoutes.post ~ sessionCookie:", sessionCookie)
    if (cookies) {
        // La cookie 'session' está presente, puedes usar su valor.
        res.status(200).json(cookies);
    } else {
        // La cookie 'session' no está presente.
        res.status(400).json({ message: 'Your session has expired, please log in again' });
    }

});

userRoutes.post("/auth/sign-in", userAuthSignIn)
userRoutes.post("/auth/sign-out", userAuthSignOut)
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