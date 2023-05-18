import {
  IRole,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { ACCOUNT_ID, ACCOUNT_REGION } from "./common/constants/stack.constants";

interface RoleOptions {
  roleName: string;
}

export class IAM {
  constructor(private parent: Construct, private stackName: string) {}

  public createFunctionRole(options: RoleOptions): IRole {
    const { roleName } = options;
    const principal = new ServicePrincipal("lambda.amazonaws.com");

    const role = new Role(
      this.parent,
      `${this.stackName}-FunctionRole-${roleName}`,
      {
        roleName: roleName,
        assumedBy: principal,
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
        ],
        inlinePolicies: {
          LambdaPermissions: new PolicyDocument({
            statements: [
              new PolicyStatement({
                actions: ["lambda:UpdateFunctionCode", "lambda:GetFunction"],
                resources: [`arn:aws:lambda:${ACCOUNT_REGION}:${ACCOUNT_ID}:function:*`],
              }),
            ],
          }),
        },
      }
    );

    return role;
  }

  public createChatbotRole(options: RoleOptions): IRole {
    const { roleName } = options;
    const principal = new ServicePrincipal("lambda.amazonaws.com");

    const role = new Role(
      this.parent,
      `${this.stackName}-ChatbotRole-${roleName}`,
      {
        roleName: roleName,
        assumedBy: principal,
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess"),
          ManagedPolicy.fromAwsManagedPolicyName(
            "AWSResourceExplorerReadOnlyAccess"
          ),
        ],
        inlinePolicies: {
          LambdaPermissions: new PolicyDocument({
            statements: [
              new PolicyStatement({
                actions: [
                  "cloudwatch:Describe*",
                  "cloudwatch:Get*",
                  "cloudwatch:List*",
                  "lambda:invokeAsync",
                  "lambda:invokeFunction",
                ],
                resources: [`*`],
              }),
            ],
          }),
        },
      }
    );

    return role;
  }
}
