const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const { swaggerSpec } = require("./config");
const indexRouter = require("./routes/indexRouter");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(indexRouter);

// Ruta para la documentación Swagger UI
app.use('/findHotel/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;