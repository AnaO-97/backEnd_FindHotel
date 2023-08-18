const userFindById = require("../controllers/userFindById.js");

const userGetID = async (req, res) => {
    try {
        const { id } = req.params;        

        const user = await userFindById(id);
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = userGetID;