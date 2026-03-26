const crypto = require("crypto");

const secret = crypto.randomBytes(10).toString("base64");

console.log(secret);
