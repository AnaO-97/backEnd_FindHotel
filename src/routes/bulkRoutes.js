const { Router } = require('express');
const bulkHandler = require("../handlers/bulkHandler.js")
const bulkRoutes = Router();

bulkRoutes.post("/", bulkHandler)

module.exports = bulkRoutes;