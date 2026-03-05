import express from "express";
import { sequelize, User } from "./models/index.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.SECRET;

app.use(express.json());

app.get("/", async (req, res) => {
  const data = await User.findAll();
  res.json(data);
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing info" });
  }
  const salt = crypto.randomBytes(16).toString("base64");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("base64");
  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    salt: salt,
  });

  res.json({ message: "User created", user: newUser });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password + user.salt)
    .digest("base64");
  if (hashedPassword !== user.password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const data = {
    email: user.email,
  };
  const token = jwt.sign(data, secret);
  res.json({ message: "Logging you in", user: data, token: token });
});

app.listen(port, () => {
  console.log("Serving on http://localhost:3000");
});
