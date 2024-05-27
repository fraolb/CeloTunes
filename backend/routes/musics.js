const express = require("express");
const router = express.Router();

const {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  uploadMusic,
} = require("../controllers/musics");

router.route("/").get(getAllMusic);
router.route("/:name").get(getSingleMusic);
router.route("/my").get(getMyMusic);
router.route("/add").post(uploadMusic);

module.exports = router;
