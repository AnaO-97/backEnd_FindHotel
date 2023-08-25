const { Deal } = require("../../models");

const getCanceledDealUserById = () => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getCanceledDealUserById