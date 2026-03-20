const { Router } = require("express");
const router = Router();

const { Book } = require("../models/index.js");

router.get("/", async (req, res) => {
  const books = await Book.findAll();
  res.json({ data: books });
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title cannot be empty" });
  }
  try {
    const newBook = await Book.create({
      title,
    });
    console.log(newBook);
    res.status(201).json({ message: `Book added: ${title}`, data: newBook });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error. Book already in database" });
  }
});

module.exports = router;
