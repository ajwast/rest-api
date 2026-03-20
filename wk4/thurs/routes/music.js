const { Router } = require("express");
const { Album, Artist } = require("../models/index.js");
const router = Router();

router.get("/albums", async (req, res) => {
  const allAlbums = await Album.findAll({ limit: 10 });
  res.json(allAlbums);
});

router.get("/albums/:id", async (req, res) => {
  const { id } = req.params;
  const foundAlbum = await Album.findOne({ where: { id: id } });
  res.status(200).json({ foundAlbum });
});

router.post("/albums", async (req, res) => {
  try {
    const { title, artist } = req.body;
    if (!title || !artist) {
      throw new Error("Empty title or artist");
    }
    const foundArtist = await Artist.findOne({ where: { artistName: artist } });
    if (!foundArtist) {
      throw new Error("Artist not found in DB");
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

router.get("/artists", async (req, res) => {
  const allAlbums = await Artist.findAll();
  res.json(allAlbums);
});

router.get("/artists/:id", async (req, res) => {
  const { id } = req.params;
  const response = await Artist.findOne({ where: { id: id } });
  res.json(response);
});

router.post("/artists", async (req, res) => {
  try {
    const { artist } = req.body;
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
