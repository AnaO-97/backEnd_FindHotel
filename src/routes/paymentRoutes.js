const { Router } = require("express");
const createOrderPost = require("../handlers/createOrderPost.js");
const receiveWebhook = require('../handlers/receiveWebhook.js');

const paymentRoutes = Router();

paymentRoutes.post("/create-order", createOrderPost);
paymentRoutes.post("/webhook", receiveWebhook);

module.exports = paymentRoutes;