import { Router } from "express";
import validate from "../utils/validateToken.js";
const router = Router();

const bookArr = [
  { title: "Dune", author: "Frank Herbert" },
  { title: "The Left Hand of Darkness", author: "Ursula K Le Guin" },
];

router.get("/", (req, res) => {
  res.json(bookArr);
});

router.post("/", validate, (req, res) => {
  const { title, author } = req.body;

  //validate input
  bookArr.push({ title, author });
  res.status(201).json({ message: "Book sucessfully added" });
});

export default router;
