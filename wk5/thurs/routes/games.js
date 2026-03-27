const { Router } = require("express");
const router = Router();
const { Game } = require("../models/index");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

router.get("/", async (req, res) => {
  // #swagger.tags = ["Games"]
  const allGames = await Game.findAll();
  res.json(allGames);
});

router.post("/create", async (req, res) => {
  // #swagger.tags = ["Games"]
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, SECRET);
    if (data.role === "user") {
      return res
        .status(401)
        .json({ message: "Only admin users can add games" });
    }
    const { title, price } = req.body;
    if (title && price) {
      if (!isNaN(Number(price))) {
        const newGame = await Game.create({
          title,
          price,
        });
        return res.status(200).json({ message: "Game created", newGame });
      } else {
        res.status(401).json({ message: "Invalid information" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Could not create game. Missing information" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
