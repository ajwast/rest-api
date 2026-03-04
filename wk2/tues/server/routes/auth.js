import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const SECRET = process.env.SECRET;

const usersArr = [
  {
    email: "admin@email.com",
    password: "admin123",
  },
  {
    email: "user1@email.com",
    password: "user123",
  },
];

function checkPassword(email, password) {
  for (const user of usersArr) {
    if (email === user.email && password === user.password) {
      return true;
    }
  }
  return false;
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (checkPassword(email, password)) {
    res.json({
      token: jwt.sign({ email }, SECRET),
      email: email,
    });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  usersArr.push({ email, password });
  res.json({ message: "User created" });
});

router.get("/", (req, res) => {
  //Bearer token
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.json({ message: "no token" });
  }

  try {
    const data = jwt.verify(token, SECRET);
    res.json({ data, personal: "Sensitive info" });
  } catch (e) {
    res.json({ message: "no token" });
  }
});

export default router;
