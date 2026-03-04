import jwt from "jsonwebtoken";

const SECRET = "squirrel";
const payload = {
  email: "test@email.com",
  avatar: "example.com.avatar.jpeg",
  displayname: "Test",
};

const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });

console.log(token);

console.log(jwt.verify(token, SECRET));

const inv_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiYXZhdGFyIjoiZXhhbXBsZS5jb20uYXZhdGFyLmpwZWciLCJkaXNwbGF5bmFtZSI6IlRlc3QiLCJpYXQiOjE3NzI1MzczODAsImV4cCI6MTc3MjYyMzc4MH0.Zn1JjqmQygYgP-FaQ2-UtylfACm2gQKjk0wZaF8gsls";

try {
  console.log(jwt.verify(inv_token, SECRET));
} catch (e) {
  console.log(e);
}

console.log("script continues...");
