const mercadopago = require('mercadopago');

const createOrder = async (attributes) => {

    mercadopago.configure({
        // sandbox: true,
        access_token: 'TEST-7828819132258985-082312-4e714b3199bdca87348c3fe1582f7e24-1457695181'
    });

    const preference = {
        items: [
            {
                title: attributes.description,
                quantity: attributes.quantity,
                currency_id: 'USD',
                unit_price: attributes.unit_price
            }
        ],
        notification_url: "https://ab86-179-6-14-10.ngrok.io/webhook",
        back_urls: {
            success: "http://localhost:3000/",
            // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
            // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
        },
        auto_return: "approved"
    };
    return mercadopago.preferences.create(preference)
        .then((response) => {
            return { init_point: response.body.init_point };
        })
        .catch((error) => {
            console.log(error);
            throw Error({ message: "Error al crear preferencia de pago" });
        });
}
module.exports = createOrder;
