const jwt = require('jsonwebtoken');
const { config } = require('../../config')
const { User } = require("../../models");
require("dotenv").config();


const userAuthActiveAccount = async (req, res) => {
    const { userActive } = req.params

    try {
        const decodedToken = jwt.verify(userActive, config.JWT_MAIL);
        const { activation, email } = decodedToken
        await User.updateOne({ email }, { $set: { status: "active" } });
        res.status(200).redirect(activation)
    } catch (error) {
        res.status(401).send(error.message);
    }

}

module.exports = userAuthActiveAccount