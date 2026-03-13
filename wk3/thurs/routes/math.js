const express = require("express");
const router = express.Router();
const { sum, multiply, isPrime } = require("../utils/math");

router.post("/sum", (req, res) => {
  const { num1, num2 } = req.body;
  const result = sum(num1, num2);
  res.json({ data: result });
});

router.post("/mult", (req, res) => {
  const { num1, num2 } = req.body;
  const result = multiply(num1, num2);
  res.json({ data: result });
});

router.get("/sum/", (req, res) => {
  const { num1, num2 } = req.query;
  const result = sum(num1, num2);
  res.json({ data: result });
});

router.post("/prime", (req, res) => {
  const { number } = req.body;
  const result = isPrime(number);
  res.json({ data: result });
});

module.exports = router;
