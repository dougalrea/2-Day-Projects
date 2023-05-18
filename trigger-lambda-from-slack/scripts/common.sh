#!/bin/bash
#-----------------------
# Common Bash Functions
#-----------------------

# Log an information message
log_info() {
  local script_name="${1:-}"
  local message="${2:-}"
  echo "[Script] [${script_name}] INFO: ${message}"
}

# Log an warn message
log_warn() {
  local script_name="${1:-}"
  local message="${2:-}"
  echo "[Script] [${script_name}] WARN: ${message}"
}

# Log an error message
log_error() {
  local script_name="${1:-}"
  local message="${2:-}"
  echo "[Script] [${script_name}] ERROR: ${message}"
}

# Die function
die() {
  local script_name="${1:-}"
  local message="${2:-}"
  local exit_code="${3:-}"
  log_error "${script_name}" "${message}"
  exit "${exit_code}"
}

# Get an AWS account id from ARN
account_id_from_arn() {
  local arn="${1:-}"
  local account_id
  account_id=$(echo "${arn}" | cut -d ":" -f 5)
  echo "${account_id}"
}

# Check first string begins with second string
beginswith() {
  local whole_string="${1:-}"
  local begin_string="${2:-}"
  case $begin_string in "${whole_string}"*) true ;; *) false ;; esac
}

# Delete file if exists
delete_file() {
  if [ -f "$1" ]; then
    rm "$1"
  fi
}

# Check first string ends with second string
endswith() {
  case $2 in *"$1") true ;; *) false ;; esac
}
