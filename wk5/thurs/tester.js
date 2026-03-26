const crypto = require("crypto");

const salt = crypto.randomBytes(16).toString("hex");


const hashedPassword = crypto
  .createHash("sha256")
  .update("password")
  .digest("hex");


