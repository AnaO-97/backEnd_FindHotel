const { Deal } = require("../../models");

const getActiveDealsUserById = () => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getActiveDealsUserById