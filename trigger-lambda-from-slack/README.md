# App Deployer

The AppDeployer function is responsible for deploying the Kubernetes/Lambda/ECS applications within the Echobox platform. This project contains the infrastructure and source code for the function.

## Useful commands

* `make install`    installs js dependencies
* `make build`      compile typescript to js
* `make diff`       compare deployed stack with current state
* `make deploy`     deploy this stack to your default AWS account/region
* `yarn watch`      watch for changes and compile
* `yarn test`       perform the jest unit tests
* `yarn cdk synth`  emits the synthesized CloudFormation template

## Deploying using the AppDeployer

* Invoke the function with the following payload:

```json
{
  "DEPLOYMENT_TYPE": "eks|lambda|ecs",
  "DEPLOYMENT_VERSION": "<version>",
  "DEPLOYMENT_DATA": {
    "EKS_CLUSTER": "<cluster_name>",
    "EKS_NAMESPACE": "<namespace>",
    "EKS_CHARTS_TO_DEPLOY": [
      {
        "name": "<service_name1>",
      }, {
        "name": "<service_name2>",
      }
    ],
    "LAMBDA_FUNCTIONS_TO_DEPLOY": [
      {
        "name": "<function_name1>",
        "repo": "<ecr_repo_url>",
      }, {
        "name": "<function_name2>",
        "repo": "<ecr_repo_url>",
      }
    ]
  }
}
```
