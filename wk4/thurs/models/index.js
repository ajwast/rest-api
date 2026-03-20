const { Sequelize, DataTypes } = require("sequelize");
// require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  database: process.env.DB_NAME,
});

const Artist = sequelize.define("artist", {
  artistName: { type: DataTypes.STRING, allowNull: false },
});

const Album = sequelize.define("album", {
  title: { type: DataTypes.STRING, allowNull: false },
});

Album.belongsTo(Artist);
Artist.hasMany(Album);

if (!process.env.NODE_ENV == "test") {
  sequelize.sync({ alter: true });
}

module.exports = { sequelize, Album, Artist };
