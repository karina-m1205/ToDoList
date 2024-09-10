const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const { Sequelize, DataTypes, Op } = require("sequelize");
const dbName = process.env.dbName;
const userName = process.env.user_Name;
const password = process.env.password;
const dbPORT = process.env.dbPORT;
const host = process.env.host;
const dialect = process.env.dialect;

const client = new Sequelize(dbName, userName, password, {
    dialect: dialect,
    host: host,
    port: dbPORT,
});

const Item = client.define("Items", {
    title: DataTypes.STRING,
    start: DataTypes.DATEONLY,
    end: DataTypes.DATEONLY,
});

module.exports.sequelizeClient = client;
module.exports.Item = Item;