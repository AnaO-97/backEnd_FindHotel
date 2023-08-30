require('dotenv').config();
const { TOKEN_MP } = process.env
const mercadopago = require('mercadopago');
const Hotel = require("../models/hotelModel");
const RoomType = require("../models/roomTypeModel");
const Deal = require("../models/dealModel");

const createOrder = async ({ User_id, Hotel_id, RoomType_id, checkIn, checkOut, quantity }) => {

    const hotel = await Hotel.findById(Hotel_id, 'name')
    const room = await RoomType.findById(RoomType_id, 'name price')

    mercadopago.configure({ access_token: TOKEN_MP });

    const preference = {
        items: [
            {
                title: `${hotel.name} - ${room.name}`,
                quantity: quantity,
                currency_id: 'USD',
                unit_price: room.price
            }
        ],
        notification_url: "https://ac35-179-6-14-10.ngrok.io/payment/webhook",
        back_urls: {
            success: "https://front-find-hotel.vercel.app/",
            // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
            failure: "https://front-find-hotel.vercel.app/",
        },
        auto_return: "approved"
    };
    return mercadopago.preferences.create(preference)
        .then((response) => {
            const newDeal = new Deal({ User_id, Hotel_id, RoomType_id, checkIn, checkOut, Preference_id: response.body.id })
            const nuevoDeal = newDeal.save()
            return {
                init_point: response.body.init_point,
                id: response.body.id,
            };
        })
        .catch((error) => {
            console.log(error);
            throw Error({ message: "Error al crear preferencia de pago" });
        });
}
module.exports = createOrder;