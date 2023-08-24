require("dotenv").config();

const config = {}
config.PORT = process.env.PORT || 3000

module.exports = config;