import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`);
});
