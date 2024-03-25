const aws = require("aws-sdk");
aws.config.update({
  accessKeyID: process.env.accessKeyID,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const sns = new aws.SNS();

const createTopic = async (req, res) => {
  //   res.send("hello from createTopic");
  const { topicName } = req.body;
  const params = {
    Name: topicName,
  };
  sns.createTopic(params, (error, data) => {
    if (error) {
      console.error("error creating sns topic", error);
      res.status(500).json({ error: "error creating sns topic" });
    } else {
      console.log("sns topic created successfully!".data);
      res.json({ topicArn: data.TopicArn });
    }
  });
};

const pushNotification = async (req, res) => {
  //   res.send("hello from pushNotification");
  const { message, topicArn } = req.body;
  const params = {
    message: message,
    topicArn: topicArn,
  };
  sns.publish(params, (err, data) => {
    if (err) {
      console.error("error publishing message", err);
      res.status(500).json({ message: "error publishing message" });
    } else {
      console.log("message published successfully!");
      res.json({ message: "message published successfully! :) " });
    }
  });
};

module.exports = {
  createTopic,
  pushNotification,
};
