#!/bin/bash

ENV=${1}
APP=${2}
PROFILE=${3}

#next-storefront 
SECRET_KEY_BASE="$(aws ssm get-parameter --name "/$ENV/grid/$APP/secret-key-base" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
REDIS_HOST="$(aws ssm get-parameter --name "/$ENV/grid/$APP/redis-host" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
NPM_TOKEN="$(aws ssm get-parameter --name "/$ENV/grid/$APP/npm-token" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
API_KEY="$(aws ssm get-parameter --name "/$ENV/grid/$APP/fed-gateway-api-key" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
API_URL="$(aws ssm get-parameter --name "/$ENV/grid/$APP/gateway-api-url" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
ROLLBAR_CLIENT_TOKEN="$(aws ssm get-parameter --name "/$ENV/grid/$APP/rollbar-client-token" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
ROLLBAR_SERVER_TOKEN="$(aws ssm get-parameter --name "/$ENV/grid/$APP/rollbar-server-token" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
LOQATE_KEY="$(aws ssm get-parameter --name "/$ENV/grid/$APP/loqate-key" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
GTM_ID="$(aws ssm get-parameter --name "/$ENV/grid/$APP/gtm-id" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
STATIC_DOMAIN="$(aws ssm get-parameter --name "/$ENV/grid/$APP/static-domain" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
APP_AUTH_USR="$(aws ssm get-parameter --name "/$ENV/grid/$APP/app-auth-usr" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
APP_AUTH_PWD="$(aws ssm get-parameter --name "/$ENV/grid/$APP/app-auth-pwd" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
REVALIDATE_INTERVAL="$(aws ssm get-parameter --name "/$ENV/grid/$APP/revalidate-interval" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
HEAP_ID="$(aws ssm get-parameter --name "/$ENV/grid/$APP/heap-id" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"
HOST_DOMAIN="$(aws ssm get-parameter --name "/$ENV/grid/$APP/$APP-url" --region eu-west-2 --with-decryption --profile=$PROFILE | jq -r ".Parameter.Value")"

nsf() {
cat <<EOF
API_URL=$API_URL
API_KEY=$API_KEY
HOST_DOMAIN=$HOST_DOMAIN
STATIC_DOMAIN=$STATIC_DOMAIN
IMG_OPTIMISATION_HOST=$HOST_DOMAIN
PORT=6601
ENV=$ENV
REVALIDATE_INTERVAL=43200
REVALIDATE_INTERVAL_ERROR=60
MICROBLINK_URL=https://microblink-secure.motorama.com
secret_key_base=$SECRET_KEY_BASE
REDIS_CACHE_HOST=$REDIS_HOST
REDIS_CACHE_PORT=16379
REDIS_KEY_PREFIX=$APP:
LOQATE_KEY=$LOQATE_KEY
NPM_TOKEN=$NPM_TOKEN
ROLLBAR_CLIENT_TOKEN=$ROLLBAR_CLIENT_TOKEN
ROLLBAR_SERVER_TOKEN=$ROLLBAR_SERVER_TOKEN
GTM_ID=$GTM_ID
HEAP_ID=$HEAP_ID
EOF
}

echo "$(nsf)" > ".env.$ENV"
