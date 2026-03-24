require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");
const { Album, Artist, sequelize } = require("../models");

const testData = {
  artists: ["Metallica", "Bob Dylan"],
  albums: [
    { title: "Ride the Lightning", artist: "Metallica" },
    { title: "Master of Puppets", artist: "Metallica" },
  ],
};

beforeAll(async () => {
  await sequelize.sync({ force: true });
  testData.artists.forEach(async (artist) => {
    const newArtist = await Artist.create({ artistName: artist });
  });
  testData.albums.forEach(async (album) => {
    const foundArtist = await Artist.findOne({
      where: { artistName: album.artist },
    });
    const newAlbum = await Album.create({
      title: album.title,
      artistId: 1,
    });
  });
});

// TEST WITH DEV DB

test("POST /albums to the test DB", async () => {
  const beforeAlbums = await request(app).get("/music/albums");
  const addAlbum = await request(app).post("/music/albums").send({
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
  });
  const afterAlbums = await request(app).get("/music/albums");
  expect(beforeAlbums.status).toBe(200);
  expect(addAlbum.status).toBe(201);
  expect(afterAlbums.status).toBe(200);
  expect(beforeAlbums.body.length).toBeLessThan(afterAlbums.body.length);
});

test("GET /music/albums gives back all albums", async () => {
  const response = await request(app).get("/music/albums");
  console.log(response.body);

  expect(response.body.length).toBeLessThanOrEqual(10);
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body[0]).toHaveProperty("title");
  expect(response.body[0]).toHaveProperty("artistId");
});

test("GET album by ID correctly", async () => {
  const getAll = await request(app).get("/music/albums");
  expect(getAll.status).toBe(200);
  expect(getAll.body.length).toBeGreaterThan(0);
  const firstAlbum = getAll.body[0];
  const response = await request(app).get("/music/albums/" + firstAlbum.id);
  expect(response.status).toBe(200);
  expect(response.body.foundAlbum).toStrictEqual(firstAlbum);
});

// TESTING WITH MOCKS

test("POST /albums add albums to mock db", async () => {
  Album.create = () => {
    return {
      title: "Ride the Lightning",
      artist: "Metallica",
    };
  };
  Artist.findOne = () => {
    return {
      artist: {
        id: 1,
      },
    };
  };
  const response = await request(app)
    .post("/music/albums")
    .send({ title: "Ride the Lightning", artist: "Metallica" });
  expect(response.body).toEqual({
    message: "Album created successfully",
    album: { title: "Ride the Lightning", artist: "Metallica" },
  });
  expect(response.status).toBe(201);
});

test("POST /albums check error status return", async () => {
  Album.create = () => {
    return {
      title: "Ride the Lightning",
      artist: "Metallica",
    };
  };
  Artist.findOne = () => {
    return {
      artist: {
        id: 1,
      },
    };
  };
  const response = await request(app)
    .post("/music/albums")
    .send({ title: "Ride the Lightning" });
  expect(response.status).toBe(500);
});
