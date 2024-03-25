const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.accessKeyID,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const sns = new aws.SNS();

const createTopic = async (req, res) => {
  const { topicName } = req.body;
  const params = {
    Name: topicName,
  };
  sns.createTopic(params, (error, data) => {
    if (error) {
      console.error("Error creating SNS topic:", error);
      res.status(500).json({ error: "Error creating SNS topic" });
    } else {
      console.log("SNS topic created successfully!");
      res.json({ topicArn: data.TopicArn });
    }
  });
};

const pushNotification = async (req, res) => {
  const { message, topicArn } = req.body;
  const params = {
    Message: message,
    TopicArn: topicArn,
  };
  sns.publish(params, (err, data) => {
    if (err) {
      console.error("Error publishing message:", err);
      res.status(500).json({ error: "Error publishing message" });
    } else {
      console.log("Message published successfully!");
      res.json({ message: "Message published successfully! :)" });
    }
  });
};

module.exports = {
  createTopic,
  pushNotification,
};
