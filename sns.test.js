const { createTopic, pushNotification } = require('./controller/aws.controller');

describe('AWS SNS Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createTopic function should create an SNS topic', async () => {
    const { SNSClient, CreateTopicCommand } = require('@aws-sdk/client-sns');

    const mockCreateTopicCommandResponse = { TopicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic' };
    SNSClient.prototype.send = jest.fn().mockResolvedValue(mockCreateTopicCommandResponse);

    const req = { body: { topicName: 'MyTopic' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await createTopic(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ topicArn: mockCreateTopicCommandResponse.TopicArn });
  });

  test('pushNotification function should publish a message to an SNS topic', async () => {
    const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

    const mockPublishCommandResponse = { MessageId: 'abc123' };
    SNSClient.prototype.send = jest.fn().mockResolvedValue(mockPublishCommandResponse);

    const req = { 
      body: { 
        message: 'Hello', 
        topicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
        platforms: ['web', 'ios', 'android'] // Adding platforms field
      } 
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await pushNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Message published successfully! :)' });
  });
});
