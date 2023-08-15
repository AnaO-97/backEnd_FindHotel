const app = require("./app");
const dataBase = require("./dataBase");
require("dotenv").config();
const { PORT } = process.env;


app.listen(PORT, () => {
    dataBase();
    console.log(`Server on port: http://localhost:${PORT}`);
});