const mercadopago = require('mercadopago');

const createOrder = async (attributes) => {

    mercadopago.configure({
        // sandbox: true,
        access_token: 'APP_USR-221953760167332-082511-1b65cb0c419e3820eaff2484eec10617-1460119336'
    });

    const preference = {
        items: [
            {
                title: attributes.title,
                quantity: attributes.quantity,
                currency_id: 'USD',
                unit_price: attributes.unit_price
            }
        ],

        notification_url: "https://6d19-179-6-14-10.ngrok.io/payment/webhook",
        back_urls: {
            success: "https://front-find-hotel.vercel.app/",
            // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
            failure: "https://front-find-hotel.vercel.app/",
        },
        auto_return: "approved"
    };
    return mercadopago.preferences.create(preference)
        .then((response) => {
            return {
                init_point: response.response.sandbox_init_point,
                id: response.body.id,
            };
        })
        .catch((error) => {
            console.log(error);
            throw Error({ message: "Error al crear preferencia de pago" });
        });
}
module.exports = createOrder;
