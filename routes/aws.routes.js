const express = require("express");
const {
  createTopic,
  pushNotification,
} = require("../controller/aws.controller");

const aws_sns_routes = express.Router();

aws_sns_routes.route("/create").get(createTopic);
aws_sns_routes.route("/push").get(pushNotification);

module.exports = aws_sns_routes;
