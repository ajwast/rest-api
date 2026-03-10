import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    email: "email@email.com",
    displayName: "User",
    avatar: "profile.jpg",
  },
  {
    email: "admin@email.com",
    displayName: "CoolAdmin420",
    avatar: "profileADMIN.jpg",
  },
];

function validateToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "SECRET");
    req.user = user;
  } catch (e) {
    req.user = null;
    res.status(401);
  }
  next();
}

app.post("/login", (req, res) => {
  const { email } = req.body;

  for (let user of users) {
    if (email === user.email) {
      const token = jwt.sign({ user }, "SECRET");
      return res.json({ token: token });
    }
  }
  res.json({ token: null });
});

app.get("/data", validateToken, (req, res) => {
  if (req.user) {
    res.json({
      user: req.user,
    });
  } else {
    res.json({ user: { displayName: "Guest" } });
  }
});

app.listen(3000, () => {
  console.log("serving...");
});
