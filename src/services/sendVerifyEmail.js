require("dotenv").config();
const path = require('path')
const fs = require('fs');

/**
 * 
 * @param {*} activationPath activation path
 * @param {*} email recipients
 * @param {*} activationAccount account activation link
 * @returns 
 */
const sendVerifyEmail = (email, activationAccount, activationPath) => {
    const bodyMail = path.join(__dirname, '../views/mailActivation.html');
    const mailActivation = fs.readFileSync(bodyMail, 'utf8');

    const mailValidation = mailActivation
        .replace('_ACTIVATION__PATH_', activationPath)
        .replace('_ACCOUNT_ACTIVATION_', activationAccount);

    const mail = {
        from: process.env.MAIL_EMAIL,
        to: email,
        subject: "Verifica tu cuenta.",
        html: mailValidation
    }

    return mail
}

module.exports = sendVerifyEmail