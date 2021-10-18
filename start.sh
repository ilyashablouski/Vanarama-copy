#!/bin/bash -e

if [[ -e "./build-env-var.linux-amd64" ]]; then
    eval "$(./build-env-var.linux-amd64 -envStdout -ignoreMissing -ssmPrefix=/$ENV/$STACK/$APP -envTemplate=env.template)"
fi

"$@"
