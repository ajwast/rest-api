const { Router } = require("express");
const router = Router();
const crypto = require("crypto");
const { User } = require("../models/index");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");

  return { salt, hashedPassword };
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {[boolean, object]}
 */
function validateRequest(username, password) {
  let error = false;
  let message = "";
  if (!username) {
    error = true;
    message = "Username required";
  }
  if (!password) {
    error = true;
    message = "Password required";
  }

  return [error, message];
}

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const [error, message] = validateRequest(username, password);
  if (error) {
    return res.status(400).json({ message });
  }
  const { salt, hashedPassword } = hashPassword(password);
  try {
    const newUser = await User.create({
      username,
      hashedPassword,
      salt,
      role,
    });
    res.status(200).json({ newUser });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [error, message] = validateRequest(username, password);
  if (error) {
    return res.status(400).json({ message });
  }
  const { salt, hashedPassword } = hashPassword(password);
  const dbUser = await User.findOne({ where: { username: username } });

  res.send(dbUser);
});

module.exports = router;
