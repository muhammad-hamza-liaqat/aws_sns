const express = require("express");
const {
  createTopic,
  pushNotification,
} = require("../controller/aws.controller");

const router = express.Router();

router.post("/create-topic", createTopic);
router.post("/push-notification", pushNotification);

module.exports = router;
