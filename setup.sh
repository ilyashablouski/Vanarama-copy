#!/bin/bash -e
ENV=${1}
STACK=${2}
APP=${3}
REGION=${4}
CURRENTBRANCH=${5}

export API_KEY = "$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/API_KEY" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export API_URL = "$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/API_URL" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
