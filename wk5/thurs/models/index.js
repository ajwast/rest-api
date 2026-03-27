const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "rootpassword1234!",
  dialect: "mysql",
  database: "vidconsdb",
});

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashedPassword: { type: DataTypes.STRING, allowNull: false },
  salt: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("admin", "user"), allowNull: false },
});

const Game = sequelize.define("game", {
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

sequelize.sync({ alter: true });
// sequelize.sync({ force: true });

module.exports = { sequelize, User, Game };
