import cryto from "node:crypto";

const randomBytes = cryto.randomBytes(40);
const SECRET = randomBytes.toString("base64");

console.log(SECRET);
