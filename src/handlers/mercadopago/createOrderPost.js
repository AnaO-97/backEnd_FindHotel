const createOrder = require('../../controllers/mercadopago/createOrder')

const createOrderPost = async (req, res) => {
    try {
        const attributes = req.body;
        const response = await createOrder(attributes)
        console.log(response)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = createOrderPost;

