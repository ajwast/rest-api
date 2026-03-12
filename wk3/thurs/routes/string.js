const express = require("express");
const router = express.Router();

function isolateFirstWord(input) {
  //   return input.split(" ")[0];
  let out = "";

  for (let i = 0; i < input.length; i++) {
    if (input[i] != " ") {
      out += input[i];
    } else {
      return out;
    }
  }
  return out;
}

function reverseString(input) {
  let out = "";

  for (let i = input.length - 1; i > -1; i--) {
    out += input[i];
  }
  return out;
}

function isPallindrome(input) {
  if (input.toLowerCase() === reverseString(input).toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

router.post("/first-word", (req, res) => {
  const { input } = req.body;
  const result = isolateFirstWord(input);
  res.json({ data: result });
});

router.post("/reverse", (req, res) => {
  const { input } = req.body;

  const result = reverseString(input);
  res.json({ data: result });
});

router.post("/pallindrome", (req, res) => {
  const { input } = req.body;
  const result = isPallindrome(input);
  res.json({ data: result });
});

module.exports = router;
