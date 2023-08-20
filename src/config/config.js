require("dotenv").config();

var config = {}

config.db = "topspinstore"
config.Clave = 'TopSpinStore'
config.timeSession = (10000 * 50)
config.hiddenKey = process.env.SESSION_KEY
config.cookieName = process.env.COOKIE_NAME

module.exports.config = config