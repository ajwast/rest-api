import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const PORT = 3000;

const SECRET = "secretsquirrel";

const users = [
  {
    email: "admin@email.com",
    password: "admin123",
  },
  {
    email: "user@email.com",
    password: "user123",
  },
];

function checkEmail(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (email === users[i].email && password === users[i].password) {
      return true;
    }
  }
  return false;
}

app.use(express.json());

app.get("/", (req, res) => {
  const authString = req.headers.authorization;
  if (!authString) {
    return res.json({ message: "Token not found" });
  }
  const token = authString.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    res.json(data);
  } catch (e) {
    res.json({ message: "Invalid token" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (checkEmail(email, password)) {
    return res.status(200).json({
      message: "Correct credentials",
      token: jwt.sign({ email }, SECRET),
    });
  }
  res.status(401).json({ message: "Bad credentials" });
});

app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`);
});
