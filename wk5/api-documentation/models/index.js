const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  database: process.env.DB_NAME,
});

const Artist = sequelize.define("artist", {
  artistName: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Album = sequelize.define("album", {
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const User = sequelize.define("user", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: DataTypes.STRING,
  salt: DataTypes.STRING,
});

Album.belongsTo(Artist);
Artist.hasMany(Album);

sequelize.sync({ alter: true });

module.exports = { sequelize, Album, Artist, User };
