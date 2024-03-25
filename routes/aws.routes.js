const express = require("express");
const {
  createTopic,
  pushNotification,
} = require("../controller/aws.controller");

const router = express.Router();

router.get("/create", createTopic);
router.get("/push", pushNotification);

module.exports = router;
