const { firebase } = require("../../config");
const { handlerSendEmailVerify } = require("../../handlers/user");
const { config } = require('../../config');
const { User } = require('../../models');

const userAuthSignIn = async (req, res) => {
  try {
    const user = req.body;
    let UserFH = await User.findOne({ email: user.email });

    if (!UserFH && user.providerId !== '') {
      const userDB = new User({
        email: user.email,
        status: 'active',
      });
      UserFH = await userDB.save();
    }

    if (UserFH) {
      if (UserFH && UserFH.status === 'active') {

        req.session.auth = {
          _id: UserFH.id,
          email: UserFH.email,
          role: UserFH.role
        }

        console.log(req.session)

        req.session.save(async (err) => {
          if (err) {
            console.error('Error al guardar la sesión:', err);
            return res.status(500).json({ message: 'Error al guardar la sesión.' });
          }

          await firebase.auth().setCustomUserClaims(user.uid, req.session.auth);

          let token;
          try {
            token = await firebase.auth().createSessionCookie(user.stsTokenManager.accessToken, {
              expiresIn: parseInt(config.SESSION_TIME * 60 * 1000),
            });

            console.log(token)
            const options = { maxAge: config.SESSION_TIME * 60 * 1000, httpOnly: true };
            // res.cookie(config.SESSION_NAME, token, options);

            return res.status(200).json(req.session.auth);
          } catch (error) {
            return res.status(500).json({ message: 'Error al generar el token de sesión.' });
          }
        });

      } else if (UserFH.status === 'inactive') {
        await handlerSendEmailVerify(user);
        return res.status(200).json({ message: 'A verification email has been sent!' });
      } else {
        return res.status(400).json({ message: 'Contact the page administrator.' });
      }
    } else {
      return res.status(404).json({ message: 'User not signup' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error en la autenticación del usuario.' });
  }
};

module.exports = userAuthSignIn;