const firebase = require("../config/firebaseConfig.js");
const User = require("../models/userModel.js");

exports.verifyEmail = (req, res) => {
    firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(function () {
            return res.status(200).json({ status: "Email Verification Sent!" });
        })
        .catch((error) => {
            if (error.code === "auth/too-many-requests") {
                return res.status(500).json({ error: error.message });
            }
        });
};