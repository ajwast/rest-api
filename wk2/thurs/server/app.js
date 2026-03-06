import express from "express";
import { sequelize, User, Post } from "./models/index.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.SECRET;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  const data = await Post.findAll();
  res.json(data);
});

app.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { email } = jwt.verify(token, secret);
    const { content } = req.body;
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (!user) {
      throw new Error("User does not exist");
    }
    const post = await Post.create({
      UserId: user.id,
      content: content,
    });
    if (!post) {
      throw new Error("Error creating post");
    }
    res.json({ message: "Received" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log("Serving on http://localhost:3000");
});
