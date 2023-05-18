import {
  ISlackChannelConfiguration,
  SlackChannelConfiguration,
} from "aws-cdk-lib/aws-chatbot";
import { IManagedPolicy, IRole, ManagedPolicy } from "aws-cdk-lib/aws-iam";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";

interface ChatbotOptions {
	chatbotConfigName: string;
  workspaceId: string;
  channelId: string;
  role?: IRole;
}

export class ChatBot {
  constructor(private parent: Construct, private stackName: string) {}

  public configureChatbotClient(
    options: ChatbotOptions
  ): ISlackChannelConfiguration {
    const { chatbotConfigName, workspaceId, channelId, role } =
      options;

		const guardrails: IManagedPolicy[] = [
			ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
			ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'),
		];

    const chatBot = new SlackChannelConfiguration(
      this.parent,
      `${this.stackName}-chatbot-config`,
      {
        slackChannelConfigurationName: chatbotConfigName,
        slackWorkspaceId: workspaceId,
        slackChannelId: channelId,
        role: role,
        guardrailPolicies: guardrails,
      }
    );

    chatBot.addNotificationTopic(new Topic(this.parent, "Slack-Chatbot-SNS"));

    return chatBot;
  }
}
