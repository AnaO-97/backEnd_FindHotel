const { Deal } = require("../../models");

const getActiveDealsUserById = () => {
    try {
        
    } catch (error) {
        res.statu(400).json({error : error.message})
    }
}

module.exports = getActiveDealsUserById