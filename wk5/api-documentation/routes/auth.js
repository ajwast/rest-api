const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const crypto = require("crypto");

const secret = process.env.SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Please input both username and password" });
  }
  const findUser = await User.findOne({ where: { username: username } });
  if (!findUser) {
    res.status(400).json({ message: "No user found" });
  }
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password + findUser.salt)
    .digest("base64");

  if (hashedPassword === findUser.password) {
    const token = jwt.sign(findUser.username, secret);
    return res.status(200).json({ user: findUser.username, token: token });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ where: { username: username } });
  if (findUser) {
    return res.status(400).json({ message: "Username already in use" });
  }
  try {
    const salt = crypto.randomBytes(16).toString("base64");
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("base64");

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      salt: salt,
    });

    res
      .status(200)
      .json({ message: `User ${username} has been successfully created` });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
