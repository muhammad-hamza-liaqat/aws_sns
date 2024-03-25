// Import the modules and functions to be tested
const { createTopic, pushNotification } = require('./controller/aws2'); // Update the path accordingly

// Mock the AWS SDK
const { SNSClient, CreateTopicCommand, PublishCommand } = require('@aws-sdk/client-sns');

jest.mock('@aws-sdk/client-sns', () => ({
  SNSClient: jest.fn(),
  CreateTopicCommand: jest.fn(),
  PublishCommand: jest.fn(),
}));

describe('AWS SNS Controller', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
  });

  test('createTopic function should create an SNS topic', async () => {
    // Mock the successful response from CreateTopicCommand
    const mockCreateTopicCommandResponse = { TopicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic' };
    SNSClient.prototype.send = jest.fn().mockResolvedValue(mockCreateTopicCommandResponse);

    // Mock the req and res objects
    const req = { body: { topicName: 'MyTopic' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Call the createTopic function
    await createTopic(req, res);

    // Check if the response is as expected
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ topicArn: mockCreateTopicCommandResponse.TopicArn });
  });

  test('pushNotification function should publish a message to an SNS topic', async () => {
    // Mock the successful response from PublishCommand
    const mockPublishCommandResponse = { MessageId: 'abc123' };
    SNSClient.prototype.send = jest.fn().mockResolvedValue(mockPublishCommandResponse);

    // Mock the req and res objects
    const req = { body: { message: 'Hello', topicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Call the pushNotification function
    await pushNotification(req, res);

    // Check if the response is as expected
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Message published successfully! :)' });
  });
});
