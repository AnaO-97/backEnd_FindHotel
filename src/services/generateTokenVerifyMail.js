require("dotenv").config();
const jwt = require('jsonwebtoken');
const firebase = require("../config/firebaseConfig");

const generateTokenVerifyMail = async (user) => {
    try {
        if (!user.emailVerified) {
            const verificationLink = await firebase
                .auth()
                .generateEmailVerificationLink(user.email);

            const token = jwt.sign({
                email: user.email,
                activation: verificationLink
            }, process.env.JWT_KEY, { expiresIn: '7d' });
            return token;

        } else {
            throw new Error('The email is already verified.');
        }
    } catch (error) {
        throw new error.message;
    }
}

module.exports = generateTokenVerifyMail