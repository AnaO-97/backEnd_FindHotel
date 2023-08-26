const mercadopago = require('mercadopago');
const receiveWebhook = async (req, res) => {
  try {
    console.log("query", req.query)
    console.log("body", req.body)
    // console.log("req", req)

    // if (payment.type === "payment") {
    //   const data = await mercadopago.payment.findById(payment["data.id"]);
    //   console.log(data);
    // }

    res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = receiveWebhook;