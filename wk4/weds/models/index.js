const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: process.env.PASSWORD,
  dialect: "mysql",
  database: "library",
});

const Book = sequelize.define("book", {
  title: { type: DataTypes.STRING, unique: true },
});

sequelize.sync({ alter: true });

module.exports = { sequelize, Book };
