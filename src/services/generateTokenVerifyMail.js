require("dotenv").config();
const jwt = require('jsonwebtoken');
const { config } = require('../config')
const { firebase } = require("../config");
const { User } = require("../models")

const generateTokenVerifyMail = async (user) => {
    try {
        const userFindHotel = await User.findOne({ email: user.email })

        if (!user.emailVerified || userFindHotel.status === 'inactive') {
            const actionCodeSettings = {
                url: config.URL_FRONT,
                handleCodeInApp: true,
            };
            const authFirebaseToken = await firebase
                .auth()
                .generateEmailVerificationLink(
                    user.email, actionCodeSettings);

            const token = jwt.sign({
                email: user.email,
                activation: authFirebaseToken
            }, config.JWT_MAIL, { expiresIn: '7d' });
            return token;

        } else {
            throw new Error('The email is already verified.');
        }
    } catch (error) {
        throw new error.message;
    };
};

module.exports = generateTokenVerifyMail;