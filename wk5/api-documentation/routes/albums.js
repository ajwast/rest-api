const { Router } = require("express");
const { Album, Artist } = require("../models/index.js");
const router = Router();

router.get("/", async (req, res) => {
  // #swagger.description = "Gets all albums from DB. Limited to 10"
  // #swagger.tags = ["Albums"]
  const allAlbums = await Album.findAll({
    include: [{ model: Artist, attributes: ["artistName"] }],
  });
  res.json(allAlbums);
});

router.get("/:id", async (req, res) => {
  // #swagger.description = "Get a single album by id"
  // #swagger.tags = ["Albums"]
  const { id } = req.params;
  const foundAlbum = await Album.findOne({ where: { id: id } });
  res.status(200).json({ foundAlbum });
});

router.post("/", async (req, res) => {
  // #swagger.description = "Add a new album to the DB"
  // #swagger.tags = ["Albums"]
  try {
    const { title, artist } = req.body;
    if (!title || !artist) {
      return res.status(400).json({ message: "Empty title or artist" });
    }
    const foundArtist = await Artist.findOne({ where: { artistName: artist } });
    if (!foundArtist) {
      return res.status(400).json({ message: "Artist not found in DB" });
    }
    const newAlbum = await Album.create({
      title: title,
      artistId: foundArtist.id,
    });
    res
      .status(201)
      .json({ message: "Album created successfully", album: newAlbum });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "500 Server Error" });
  }
});

module.exports = router;
