#!/bin/bash -e
ENV=${1}
STACK=${2}
APP=${3}
REGION=${4}
CURRENTBRANCH=${5}
ALTERNATEDOMAIN=${6}
HOST_DOMAIN="https://${6}"
IMGOPTIMISATIONHOST=${7}

export ENV=$ENV
export API_KEY="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/API_KEY" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export API_URL="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/API_URL" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export LOQATE_KEY="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/LOQATE_KEY" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export ROLLBAR_CLIENT_TOKEN="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/ROLLBAR_CLIENT_TOKEN" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export ROLLBAR_SERVER_TOKEN="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/ROLLBAR_SERVER_TOKEN" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export GTM_ID="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/GTM_ID" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export IMG_OPTIMISATION_HOST="$IMGOPTIMISATIONHOST"
export PRERENDER_SERVICE_URL="https://prerender-service-production.herokuapp.com/"
export MICROBLINK_URL="https://microblink-secure.motorama.com"
export STATIC_DOMAIN="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/STATIC_DOMAIN" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export HEAP_ID="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/HEAP_ID" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export REVALIDATE_INTERVAL="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/REVALIDATE_INTERVAL" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export REVALIDATE_INTERVAL_ERROR="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/REVALIDATE_INTERVAL_ERROR" --region $REGION --with-decryption | jq -r ".Parameter.Value")"