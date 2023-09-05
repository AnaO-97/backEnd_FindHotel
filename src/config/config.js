require("dotenv").config();

const config = {}
config.DOMAINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    undefined
]

config.PORT = process.env.PORT || 3000

config.URL_FRONT = process.env.URL_FRONT_FINDHOTEL
config.URL_BACK = process.env.URL_BACK_FINDHOTEL
config.URL_MONGO_FINDHOTEL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.lmykssy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

config.JWT_MAIL = process.env.JWT_MAIL_KEY
config.MAIL_FINDHOTEL = process.env.MAIL_EMAIL
config.PASS_FINDHOTEL = process.env.MAIL_PASSWORD

config.JWT_ID_SESSION = process.env.JWT_ID_SESSION
config.SESSION_KEY = process.env.COOKIE_KEY
config.SESSION_NAME = process.env.COOKIE_NAME
config.SESSION_DOMAIN = process.env.COOKIE_DOMAIN
config.SESSION_TIME = parseInt(process.env.COOKIE_TIME)

module.exports = config;