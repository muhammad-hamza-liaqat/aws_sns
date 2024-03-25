const createTopic = async (req, res) => {
  res.end("hello from createTopic");
};

const pushNotification = async (req, res) => {
  res.end("hello from pushNotification");
};

module.exports = {
  createTopic,
  pushNotification,
};
