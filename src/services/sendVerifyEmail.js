require("dotenv").config();
const path = require('path');
const fs = require('fs');
const { config } = require('../config')

/**
 * 
 * @param {*} activationPath activation path
 * @param {*} email recipients
 * @param {*} activationAccount account activation link
 * @returns 
 */
const sendVerifyEmail = (email, token, file, route) => {
    try {
        const bodyMail = path.join(config.MAIL_ROUTE, `${file}.html`);
        const readMail = fs.readFileSync(bodyMail, 'utf8');

        const mailToSend = readMail
            .replace('_ACTIVATION__PATH_', `${config.URL_BACK}${route}`)
            .replace('_ACCOUNT_ACTIVATION_', token);

        const mail = {
            from: config.MAIL_EMAIL,
            to: email,
            subject: "Verifica tu cuenta.",
            html: mailToSend
        };

        return mail;

    } catch (error) {
        console.log(error)
    }
};

module.exports = sendVerifyEmail;