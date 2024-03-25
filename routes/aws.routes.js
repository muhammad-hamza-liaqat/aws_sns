const express = require("express");

const router = express.Router();

router.post("/create-topic");
router.post("/push-notification");

module.exports = router