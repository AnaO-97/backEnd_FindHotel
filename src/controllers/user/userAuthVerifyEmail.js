const { firebase } = require("../../config");
const { handlerSendEmailVerify } = require("../../handlers/user");
const { User } = require("../../models");

const userAuthVerifyEmail = async (req, res) => {
    const { email } = req.params
    try {

        const userFindHotel = User.findOne({ email, status: 'inactive' })
        if (userFindHotel) {
            await handlerSendEmailVerify(userFindHotel)
            return res.status(200).json({ message: "Email Verification Sent!" });
        }
        else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
module.exports = userAuthVerifyEmail 