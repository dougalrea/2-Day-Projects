#!/bin/bash



timed_check_lambda_status() {
  local function_name="${1:-}"

  local status
  status=$(aws lambda get-function --function-name "${function_name}" --query "Configuration.State" --output text)

  for i in {1..10}; do
    if [[ "${status}" == "Active" ]]; then
      echo "Function ${function_name} is active"
      return 0
    fi
    echo "Function ${function_name} is in state ${status}, waiting 1 second"
    sleep 1
    status=$(aws lambda get-function --function-name "${function_name}" --query "Configuration.State" --output text)
  done
}

main() {
  local repo="ebx/build/appdeployer"
  local account="558091818291"
  local region="eu-west-1"
  local repo_url="${account}.dkr.ecr.${region}.amazonaws.com/${repo}"
  local repo_arn="arn:aws:ecr:${region}:${account}:repository/${repo}"

  # Get the version
  local version="${1:-}"

  aws lambda update-function-code --function-name "AppDeployer" --image-uri "${repo_url}:${version}" --query "LastUpdateStatus" --output text

  timed_check_lambda_status "AppDeployer"
}

main "$@"
