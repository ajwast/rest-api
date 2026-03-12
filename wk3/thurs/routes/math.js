const express = require("express");
const router = express.Router();

function sum(num1, num2) {
  result = Number(num1) + Number(num2);
  if (isNaN(result)) {
    return "Can only sum number inputs";
  }
  return result;
}

function multiply(num1, num2) {
  result = Number(num1) * Number(num2);
  if (isNaN(result)) {
    return "Can only receive number inputs";
  }
  return result;
}

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

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
