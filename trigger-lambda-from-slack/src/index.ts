import { App, Stack, StackProps } from "aws-cdk-lib";
import { ACCOUNT_ID, SERVICE_NAME, STACK_NAME } from "./common/constants/stack.constants";
import { IAM } from "./iam";
import { Lambda } from "./lambda";
import { ChatBot } from "./chatbot";
import { SLACK_CHANNEL_ID, SLACK_CHATBOT_CONFIG_NAME, SLACK_WORKSPACE_ID } from "./common/constants/slack-chatbot.constants";

export class InfrastructureBase extends Stack {
  constructor(app: App, stackName: string, stackProps: StackProps) {
    super(app, stackName, stackProps);

    // Instantiate my constructs
    const iam = new IAM(this, this.stackName);
    const lambda = new Lambda(this, this.stackName);
    const chatbot = new ChatBot(this, this.stackName);

    // Create the IAM Role for the Lambda function
    const functionRole = iam.createFunctionRole({
      roleName: SERVICE_NAME,
    });
    // Create the IAM Role for the ChatBot
    const chatbotRole = iam.createChatbotRole({
      roleName: SERVICE_NAME,
    });

    // Create the Function
    lambda.createFunction({
      functionName: SERVICE_NAME,
      role: functionRole,
      timeoutSeconds: 12,
    });

    // Create the ChatBot
    chatbot.configureChatbotClient({
      chatbotConfigName: SLACK_CHATBOT_CONFIG_NAME,
      workspaceId: SLACK_WORKSPACE_ID,
      channelId: SLACK_CHANNEL_ID,
      role: chatbotRole,
    })
  }
}

// Setup the application
const app = new App();
const stackName = STACK_NAME;

const stackProps: StackProps = {
  env: {
    region: "eu-west-1",
    account: ACCOUNT_ID,
  },
};

new InfrastructureBase(app, stackName, stackProps);

app.synth();
