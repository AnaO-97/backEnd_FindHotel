const postBulk = require("../controllers/postBulk.js");

const bulkPost = async (req, res) => {
    try {
        const attributes = req.body;
        const bulk = await postBulk(attributes);
        res.status(200).json(bulk);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};

module.exports = bulkPost;