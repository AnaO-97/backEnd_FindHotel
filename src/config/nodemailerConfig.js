const nodemailer = require('nodemailer');
require("dotenv").config();

// Configuración del transporte de correo (SMTP)
const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = mailTransport;