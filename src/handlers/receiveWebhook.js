require('dotenv').config();
const { TOKEN_MP } = process.env
const mercadopago = require('mercadopago');
const Deal = require("../models/dealModel");

const receiveWebhook = async (req, res) => {
  try {
    mercadopago.configurations.setAccessToken(TOKEN_MP)
    const { id, topic } = req.query

    if (topic === 'merchant_order') {
      //el id en este caso corresponde al Order_ID
      const { response } = await mercadopago.merchant_orders.findById(id)
      await Deal.findOneAndUpdate(
        { Preference_id: response.preference_id },
        {
          Order_id: id,
          status: response.order_status === 'paid' ? 'purchase' : 'booking'
        },
        { new: true },
      );
    }

    if (topic === 'payment') {
      //el id en este caso corresponde al MercadoPago_operation
      const { response } = await mercadopago.payment.findById(id)
      await Deal.findOneAndUpdate(
        { Order_id: response.order.id },
        {
          MercadoPago_operation: response.id,
        },
        { new: true },
      );
    }
    
    res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = receiveWebhook;