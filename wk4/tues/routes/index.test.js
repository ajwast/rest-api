const express = require("express");
const indexRouter = require("./index");
const request = require("supertest");

const app = express();
app.use("/", indexRouter);

test("get data from /deck endpoint that it has 52 cards", async () => {
  const data = await request(app).get("/deck");
  expect(data.body.length).toBe(52);
});
