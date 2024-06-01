const express = require("express");
const router = express.Router();
const Upload = require("../multer");

const {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  uploadMusic,
  buyMusic,
} = require("../controllers/musics");
const { subscribeMusic } = require("../controllers/subscription");

router.route("/").get(getAllMusic);
router.route("/single").get(getSingleMusic);
router.route("/my-music").get(getMyMusic);
//router.route("/upload").post(uploadMusic);
router.post("/upload", Upload.array("data", 2), uploadMusic);
router.route("/buy").post(buyMusic);
router.route("/subscribe").post(subscribeMusic);

module.exports = router;
