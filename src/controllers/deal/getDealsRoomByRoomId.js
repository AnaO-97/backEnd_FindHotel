const { Deal } = require("../../models");

const getDealsRoomByRoomId = () => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.export = getDealsRoomByRoomId;