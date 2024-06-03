const express = require("express");
const router = express.Router();

const { createUser, getUser } = require("../controllers/user");

router.route("/create").post(createUser);
router.route("/get").get(getUser);

module.exports = router;
