const express = require("express");
const router = express.Router();

const {
  subscribeMusic,
  checkSubscription,
} = require("../controllers/subscription");

router.route("/add").post(subscribeMusic);
router.route("/check").get(checkSubscription);

module.exports = router;
