const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

// dummy data in memory
const books = [
  { id: 1, title: "Dune", author: "Frank Herbert" },
  { id: 2, title: "The Lord of the Rings", author: "JRR Tolkein" },
];

let nextId = 3;

const baseURL = "/books";

// Get all books
app.get(baseURL, (req, res) => {
  res.status(200).json(books);
});

//Get book by id

app.get(baseURL + "/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((b) => b.id == id);

  if (!book) {
    return res.status(404).json({ message: `Book with ID: ${id} not found` });
  }
  res.status(200).json(book);
});

//Add new book

app.post(baseURL, (req, res) => {
  const { title, author } = req.body ?? {};
  if (!title || !author) {
    return res.status(400).json({ message: `Book must have title and author` });
  }
  console.log(title, author);
  const newBook = { id: nextId, title, author };
  books.push(newBook);
  nextId++;
  res.status(201).json(newBook);
});

//Delete book

app.delete(baseURL + "/:id", (req, res) => {
  const id = Number(req.params.id);

  const bookIndex = books.findIndex((b) => b.id == id);

  if (bookIndex === -1) {
    return res.status(400).json({ message: `Book with ID: ${id} not found` });
  }
  books.splice(bookIndex, 1);
  res.status(204).send();
});

//Replace Book
app.put(baseURL + "/:id", (req, res) => {
  const pathId = Number(req.body.id);
  const { id, title, author } = req.body ?? {};

  console.log(id, title, author);

  if (pathId !== id) {
    return res.status(400).json({ message: "Bad Path ID" });
  }

  if (!title || !author) {
    return res.status(400).json({ message: `Book must have title and author` });
  }

  const bookIndex = books.findIndex((b) => b.id == id);

  if (bookIndex === -1) {
    return res.status(400).json({ message: `Book with ID: ${id} not found` });
  }

  const updatedBook = { id, title, author };
  books[bookIndex] = updatedBook;

  res.status(200).json({ message: "Book changed" });
});

app.listen(port, () => {
  console.log(`Serving on ${port}`);
});
