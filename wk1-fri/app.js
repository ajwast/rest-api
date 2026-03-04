import express from "express";

import bookRouter from "./routes/book.js";
import profileRouter from "./routes/profile.js";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/books", bookRouter);
app.use("/profile", profileRouter);

app.listen(port, () => {
  console.log(`Serving on ${port}`);
});
