const express = require("express");
const session = require('express-session');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const { config, swaggerSpec } = require('./config')
const swaggerUI = require('swagger-ui-express');
const indexRouter = require("./routes/indexRouter");
const MongoStore = require('connect-mongo')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Config la session
const sessionConfig = {
    name: config.SESSION_NAME,
    secret: config.SESSION_KEY,
    resave: false, // Define resave como false para evitar la advertencia
    saveUninitialized: false,
    rolling: true,
    cookies: {
        path: '/',
        secure: false,
        httpOnly: false,
        maxAge: config.SESSION_TIME * 60 * 1000,
    },
    store: new MongoStore({
        mongoUrl: config.URL_MONGO_FINDHOTEL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        collection: 'sessions',
        ttl: config.SESSION_TIME * 60,
        stringify: false
    })
}

// const requireAuth = (req, res, next) => {
//   if (req.session && req.session.user) {
//     // El usuario está autenticado, puedes acceder a req.session.user
//     req.session.touch(); // Renovar la sesión
//     next();
//   } else {
//     // El usuario no está autenticado, puedes redirigirlo o tomar alguna otra acción
//     res.status(401).send('No estás autenticado');
//   }
// };
app.use(session(sessionConfig));

// Middlewares de registro y CORS
app.use(morgan("dev"))

// Middleware de rutas
app.use(indexRouter);


// Ruta para la documentación Swagger UI
app.use('/findHotel/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;