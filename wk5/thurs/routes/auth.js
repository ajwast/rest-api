const { Router } = require("express");
const router = Router();
const crypto = require("crypto");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function hashPassword(password, salt) {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");

  return hashedPassword;
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {[boolean, string]}
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
  // #swagger.tags = ["Auth"]
  const { username, password, role } = req.body;
  const [error, message] = validateRequest(username, password);
  if (error) {
    return res.status(400).json({ message });
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = hashPassword(password, salt);
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
    // #swagger.tags = ["Auth"]
  try {
    const { username, password } = req.body;
    const [error, message] = validateRequest(username, password);
    if (error) {
      return res.status(400).json({ message });
    }

    const dbUser = await User.findOne({ where: { username } });
    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const hashedPassword = hashPassword(password, dbUser.salt);
    if (dbUser.hashedPassword === hashedPassword) {
      const payload = {
        id: dbUser.id,
        username: dbUser.username,
        role: dbUser.role,
      };
      token = jwt.sign(payload, SECRET);
      return res
        .status(200)
        .json({
          message: `Logging you in ${dbUser.username}`,
          user: payload,
          token,
        });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
