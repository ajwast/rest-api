import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: process.env.PASSWORD,
  dialect: "mysql",
  database: "auth",
});

function defineUser(sequelize) {
  const User = sequelize.define("User", {
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
  });
  return User;
}

function definePost(sequelize) {
  const Post = sequelize.define("Post", {
    content: DataTypes.STRING,
  });
  return Post;
}

const User = defineUser(sequelize);
const Post = definePost(sequelize);

Post.belongsTo(User);
User.hasMany(Post);

sequelize.sync({ alter: true });

export { sequelize, User, Post };
