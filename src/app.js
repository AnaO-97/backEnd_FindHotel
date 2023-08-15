const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(indexRouter);

module.exports = app;