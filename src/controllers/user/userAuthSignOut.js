const { config } = require('../../config')

const userAuthSignOut = (req, res) => {
    console.log(req.session)
    req.session.destroy((err) => {
        if (err) {
            res.status(404).json({ error: 'Error al cerrar sesión:' });
        } else {
            res.session = null;
            res.clearCookie(config.SESSION_NAME);
            res.redirect('/');
        }
    })
}

module.exports = userAuthSignOut