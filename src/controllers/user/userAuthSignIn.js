const { firebase } = require("../../config");
const { handlerSendEmailVerify,
  handlerDateFinishSession,
  handlerTokenIdSession } = require("../../handlers/user");
const { config } = require('../../config');
const { User } = require('../../models');

const userAuthSignIn = async (req, res) => {
  try {
    const user = req.body;

    let UserFH = await User.findOne({ email: user.email });

    if (UserFH === null && user.providerId !== '') {
      const userDB = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.photoUrl,
        email: user.email,
        status: 'active',
      });
      console.log("🚀 ~ file: userAuthSignIn.js:22 ~ userAuthSignIn ~ userDB:", userDB)
      UserFH = await userDB.save();
    }

    if (UserFH) {
      if (UserFH && UserFH.status === 'active') {

        req.session.auth = {
          User_id: UserFH._id,
          firstName: UserFH.firstName,
          lastName: UserFH.lastName,
          email: UserFH.email,
          image: UserFH.image,
          role: UserFH.role
        }

        req.session.save(async (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error al guardar la sesión.' });
          }

          await firebase.auth().setCustomUserClaims(user.localId, req.session.auth);

          let token;
          try {
            token = await firebase.auth().createSessionCookie(user.idToken, {
              expiresIn: parseInt(config.SESSION_TIME * 60 * 1000),
            });

            const options = { maxAge: config.SESSION_TIME * 60 * 1000, httpOnly: true };

            const id_session = req.sessionID
            const expires = await handlerDateFinishSession(id_session)

            res.cookie(config.SESSION_NAME, token, options)
            return res.status(200).json({
              _id: handlerTokenIdSession(id_session),
              expires: expires,
              ...req.session.auth
            })
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