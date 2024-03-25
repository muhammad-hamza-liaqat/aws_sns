const { SNSClient, CreateTopicCommand, PublishCommand } = require("@aws-sdk/client-sns");

// Create an instance of the SNS client with the access key ID, secret access key, and region
const snsClient = new SNSClient({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const createTopic = async (req, res) => {
  const { topicName } = req.body;
  const params = {
    Name: topicName,
  };
  try {
    const data = await snsClient.send(new CreateTopicCommand(params));
    console.log("SNS topic created successfully!");
    res.status(200).json({ topicArn: data.TopicArn });
  } catch (error) {
    console.error("Error creating SNS topic:", error);
    res.status(500).json({ error: "Error creating SNS topic" });
  }
};

const pushNotification = async (req, res) => {
  const { message, topicArn } = req.body;
  const params = {
    Message: message,
    TopicArn: topicArn,
  };
  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log("Message published successfully!");
    res.status(200).json({ message: "Message published successfully! :)" });
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).json({ error: "Error publishing message" });
  }
};

module.exports = {
  createTopic,
  pushNotification,
};
