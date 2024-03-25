const { SNSClient, CreateTopicCommand, PublishCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({ region: process.env.region });

const createTopic = async (req, res) => {
  const { topicName } = req.body;
  const params = {
    Name: topicName,
  };
  try {
    const data = await snsClient.send(new CreateTopicCommand(params));
    console.log("SNS topic created successfully!");
    res.json({ topicArn: data.TopicArn });
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
    res.json({ message: "Message published successfully! :)" });
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).json({ error: "Error publishing message" });
  }
};

module.exports = {
  createTopic,
  pushNotification,
};
