const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");
require("dotenv").config();


const userAuthActiveAccount = async (req, res) => {
    const { userActive } = req.params

    try {
        const decodedToken = jwt.verify(userActive, process.env.JWT_KEY);
        const { activation, email } = decodedToken
        console.log(email)
        await User.updateOne({ email }, { $set: { status: "Active" } });
        res.status(200).redirect(activation)
    } catch (error) {
        res.status(401).send(error.message);
    }


}

module.exports = userAuthActiveAccount