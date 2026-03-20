require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { sequelize, Book } = require("../models/index");

jest.mock("../models/index", () => {
  return {
    sequelize: {},
    Book: { findAll: jest.fn(), create: jest.fn() },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

test("GET /books should return all books", async () => {
  Book.findAll.mockResolvedValue([{ title: "Dune" }]);
  const data = await request(app).get("/books");
  expect(data.body.data.length).toBe(1);
  expect(data.body.data[0].title).toBe("Dune");
});

test("POST /books creates new book in DB", async () => {
  Book.create.mockResolvedValue({
    id: 1,
    title: "Dune Messiah",
    createdAt: "2026-03-18T13:01:59.937Z",
    updatedAt: "2026-03-18T13:01:59.937Z",
  });

  const response = await request(app)
    .post("/books")
    .send({ title: "Dune Messiah" });
  expect(response.body.data.title).toBe("Dune Messiah");
  expect(response.status).toBe(201);
});

test("POST /books throw error if title is empty", async () => {
  Book.create.mockResolvedValue({
    id: 1,
    title: "Dune Messiah",
    createdAt: "2026-03-18T13:01:59.937Z",
    updatedAt: "2026-03-18T13:01:59.937Z",
  });

  const response = await request(app).post("/books").send({ title: "" });
  expect(response.status).toBe(400);
});
