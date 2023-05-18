import { Duration } from "aws-cdk-lib";
import { IRole } from "aws-cdk-lib/aws-iam";
import { Code, Function, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

interface FunctionOptions {
  functionName: string;
  role?: IRole;
  timeoutSeconds: number;
}

export class Lambda {
  constructor(private parent: Construct, private stackName: string) {}

  public createFunction(options: FunctionOptions): IFunction {
    const { functionName, timeoutSeconds, role } = options;

    const lambdaFunction = new Function(this.parent, `${this.stackName}-Function-${functionName}`, {
      functionName: functionName,
      runtime: Runtime.PYTHON_3_10,
      handler: 'count_to_ten.lambda_handler',
      code: Code.fromAsset('lambda/functions/count_to_ten'),
      role: role,
      timeout: Duration.seconds(timeoutSeconds),
      logRetention: RetentionDays.THREE_DAYS,
    });

    return lambdaFunction;
  }
}
