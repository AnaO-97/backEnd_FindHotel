const app = require("./src/app");
const dataBase = require("./src/dataBase");
const config = require("./src/config/config");

const { PORT } = process.env;
app.listen(PORT, () => {
    dataBase();
    console.log(`Server on port: http://localhost:${ config.PORT  }`);
});
