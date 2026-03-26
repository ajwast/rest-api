var express = require("express");
var router = express.Router();

const { User } = require("../models/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const allUsers = User.findAll();
  res.json(allUsers);
});

module.exports = router;
