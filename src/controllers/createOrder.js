const mercadopago = require('mercadopago');

const createOrder = async (attributes) => {

    mercadopago.configure({
        // sandbox: true,
        access_token: 'TEST-1953808183232659-082322-c0d3eac7f8d6093c57055c9169598604-288193957'
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
