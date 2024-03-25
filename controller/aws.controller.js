const createTopic = async (req, res) => {
  res.send("hello from createTopic");
};

const pushNotification = async (req, res) => {
  res.send("hello from pushNotification");
};

module.exports = {
  createTopic,
  pushNotification,
};
