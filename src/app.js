const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const PORT = process.env.PORT;
const { todoList } = require(path.join(__dirname, "./api/todolist.js"));
const { sequelizeClient } = require(path.join(__dirname, "./core/postgresDb.js"));

(async () => {
    await sequelizeClient.sync();
    console.log("connect to postgresDB");
})();

const app = express();
app.use(express.json());
app.use("/", todoList);

app.listen(PORT, () => {
    console.log(`app running on http://localhost:${PORT}`);
})


