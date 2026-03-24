const { Router } = require("express");
const { Album, Artist } = require("../models/index.js");
const router = Router();

router.get("/", async (req, res) => {
  // #swagger.description = "Gets all artists from DB"
  // #swagger.tags = ["Artists"]
  const allArtists = await Artist.findAll({ limit: 20 });
  res.json(allArtists);
});

router.get("/:id", async (req, res) => {
  // #swagger.description = "Get a single artist by id"
  // #swagger.tags = ["Artists"]
  const { id } = req.params;
  const response = await Artist.findOne({ where: { id: id } });
  res.json(response);
});

router.post("/", async (req, res) => {
  // #swagger.description = "Create new DB entry for an artist"
  // #swagger.tags = ["Artists"]
  try {
    const { artist } = req.body;
    if (!artist) {
      return res.status(400).json({ message: "Artist name is required" });
    }
    const newArtist = await Artist.create({
      artistName: artist,
    });
    res
      .status(201)
      .json({ message: "Artist created successfully", artist: newArtist });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "500 Server Error" });
  }
});

module.exports = router;
