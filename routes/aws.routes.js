const express = require("express");
const {
  createTopic,
  pushNotification,
} = require("../controller/aws.controller");

const aws_sns_routes = express.Router();

aws_sns_routes.route("/create").post(createTopic);
aws_sns_routes.route("/push").post(pushNotification);

module.exports = aws_sns_routes;
