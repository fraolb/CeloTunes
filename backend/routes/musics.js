const express = require("express");
const router = express.Router();

const {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  uploadMusic,
  buyMusic,
} = require("../controllers/musics");

router.route("/").get(getAllMusic);
router.route("/single").get(getSingleMusic);
router.route("/my-music").get(getMyMusic);
router.route("/add").post(uploadMusic);
router.route("/buy").post(buyMusic);

module.exports = router;
