#!/bin/bash
set -euo pipefail
trap 'finish $?' EXIT
#
#  ECHOBOX CONFIDENTIAL
#
#  All Rights Reserved.
#
#  NOTICE: All information contained herein is, and remains the property of
#  Echobox Ltd. and itscheck_environment_selection suppliers, if any. The
#  intellectual and technical concepts contained herein are proprietary to
#  Echobox Ltd. and its suppliers and may be covered by Patents, patents in
#  process, and are protected by trade secret or copyright law. Dissemination
#  of this information or reproduction of this material, in any format, is
#  strictly forbidden unless prior written permission is obtained
#  from Echobox Ltd.
#

# What's my name?
declare SCRIPT_NAME
declare SCRIPT_DIR
SCRIPT_NAME=$(basename -- "$0" .sh)
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
readonly SCRIPT_NAME
readonly SCRIPT_DIR

# Grab common functions
# shellcheck source=./common.sh
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/common.sh"

# Finish Function
finish() {
  log_info "${SCRIPT_NAME}" "*** SCRIPT FINISH ***"
}

# Parse Params
# Parse Parameters
parse_params() {
  # default values of variables set from params
  version=""
  build="no"

  while :; do
    case "${1-}" in
      -x | --verbose) set -x ;;
      -v | --version)
        version="${2-}"
        shift
        ;;
      -b | --build) build="yes" ;;
      -?*) die "${SCRIPT_NAME}" "Unknown option: $1" 1 ;;
      *) break ;;
    esac
    shift
  done

  if [[ "${version}" == "" ]]; then
    die "${SCRIPT_NAME}" "you must specify a version (-v | --version)" 1
  fi

  return 0
}

# Main Function
main() {
  log_info "${SCRIPT_NAME}" "*** SCRIPT START ***"

  parse_params "$@"

  local account_id
  account_id=$(aws sts get-caller-identity --query Account --output text)

  local repo="ebx/build/appdeployer"

  if [[ "${build}" == "yes" ]]; then
    docker build -t "app_deployer:${version}" "${SCRIPT_DIR}/../lambda/functions/app_deployer"
    docker tag "app_deployer:${version}" "${account_id}.dkr.ecr.eu-west-1.amazonaws.com/${repo}:${version}"
  fi

  docker push "${account_id}.dkr.ecr.eu-west-1.amazonaws.com/${repo}:${version}"
}

# Light's Out, Away We Go
main "$@"