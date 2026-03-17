var express = require("express");
var router = express.Router();
const generateDeck = require("../util/generateDeck.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/deck", (req, res) => {
  //generate a deck of playing cards
  const deck = generateDeck();
  res.json(deck);
});

module.exports = router;
