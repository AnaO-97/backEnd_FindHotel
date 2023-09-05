const { mailTransport } = require("../../config");
const { sendVerifyMail, generateTokenVerifyMail } = require("../../services")


const handlerSendEmailVerify = async (user) => {

    const tokenMail = await generateTokenVerifyMail(user)
    const mail = sendVerifyMail(user.email, tokenMail, 'mailActivation', '/user/auth')
    mailTransport.sendMail(mail);
}

module.exports = handlerSendEmailVerify