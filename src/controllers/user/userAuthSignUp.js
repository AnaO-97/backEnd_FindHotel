const firebase = require("../../config");
const mailTransport = require("../../config/nodemailerConfig.js");
const { sendVerifyMail, generateTokenVerifyMail } = require("../../services")
const User = require("../../models/userModel.js");

const userAuthSignUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email });
        const userSave = await user.save()

        if (userSave) {
            const userFirebase = await firebase
                .auth()
                .createUser({
                    email: email,
                    password: password,
                }).then((userCredential) => {
                    return userCredential
                    // res.status(200).json({ userCredential });
                })
                .catch((error) => {
                    if (error.code === "auth/wrong-password") {
                        return res.status(500).json({ error: error.message });
                    } else {
                        return res.status(500).json({ error: error.message });
                    }
                })

            if (userFirebase) {
                const tokenMail = await generateTokenVerifyMail(userFirebase)
                const mail = sendVerifyMail(email, tokenMail, 'http://localhost:3001/user/active')
                mailTransport.sendMail(mail)
                return res.status(200).json({ message: "The user has been successfully registered, a verification email has been sent!" });
            } else {
                return res.status(200).json({ message: "The user has previously registered" });
            }
        }
        else {
            return res.status(400).json({ error: "The user has previously registered" });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = userAuthSignUp;