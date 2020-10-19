#!/bin/bash -e
ENV=${1}
STACK=${2}
APP=${3}
REGION=${4}
CURRENTBRANCH=${5}
ALTERNATEDOMAIN=${6}

export ENV=$ENV
export API_KEY="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/fed-gateway-api-key" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export API_URL="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/gateway-api-url" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export LOQATE_KEY="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/loqate-key" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export GITHUB_TOKEN="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/github-token" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export ROLLBAR_CLIENT_TOKEN="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/rollbar-client-token" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export ROLLBAR_SERVER_TOKEN="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/rollbar-server-token" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export GTM_ID="$(aws ssm get-parameter --name "/$ENV/$STACK/$APP/gtm-id" --region $REGION --with-decryption | jq -r ".Parameter.Value")"
export HOSTNAME="https://$ALTERNATEDOMAIN"
export IMG_OPTIMISATION_HOST="https://vanarama.com"
export PRERENDER_SERVICE_URL="https://prerender-service-production.herokuapp.com/"
export MICROBLINK_URL="https://microblink-secure.motorama.com"