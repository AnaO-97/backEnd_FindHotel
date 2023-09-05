const app = require("./src/app");
const dataBase = require("./src/dataBase");
const config = require("./src/config/config");

app.listen(config.PORT, () => {
    dataBase();
    console.log(`Server on port: http://localhost:${config.PORT}`);
});
