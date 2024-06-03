const express = require("express");
const router = express.Router();
const Upload = require("../multer");

const {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  uploadMusic,
  addMusic,
} = require("../controllers/musics");

router.route("/").get(getAllMusic);
router.route("/single").get(getSingleMusic);
router.route("/my-music").get(getMyMusic);
//router.route("/upload").post(uploadMusic);
router.post("/upload", Upload.array("data", 2), uploadMusic);
router.route("/add").post(addMusic);

module.exports = router;
